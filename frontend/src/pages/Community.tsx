import React, { useEffect, useState } from 'react';
import { Users, MessageSquare, UserPlus } from 'lucide-react';

interface User {
  id: string;
  full_name: string;
  user_type: string;
  points: number;
}

export function Community() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:4000/api/users');
      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 mt-20">Community</h1>
        <p className="text-gray-300">Connect with fellow students and organizers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-dark-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Active Members</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {users.map((user) => (
                  <div key={user.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-white">{user.full_name}</h3>
                        <p className="text-sm text-blue-300 capitalize">{user.user_type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-blue-300">{user.points} points</span>
                      <button className="text-blue-400 hover:text-blue-200">
                        <UserPlus className="h-5 w-5" />
                      </button>
                      <button className="text-blue-400 hover:text-blue-200">
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-dark-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Community Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-300">Total Members</span>
                <span className="font-semibold text-white">{users.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-300">Students</span>
                <span className="font-semibold text-white">
                  {users.filter(u => u.user_type === 'student').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-300">Organizers</span>
                <span className="font-semibold text-white">
                  {users.filter(u => u.user_type === 'organizer').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-dark-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Top Contributors</h2>
            <div className="space-y-4">
              {users.slice(0, 5).map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-blue-400 w-6">
                      #{index + 1}
                    </span>
                    <span className="ml-2 text-white">{user.full_name}</span>
                  </div>
                  <span className="font-semibold text-blue-300">{user.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}