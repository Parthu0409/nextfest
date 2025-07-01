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
        <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-20">Community</h1>
        <p className="text-gray-600">Connect with fellow students and organizers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Active Members</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {users.map((user) => (
                  <div key={user.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{user.full_name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{user.user_type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{user.points} points</span>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <UserPlus className="h-5 w-5" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-800">
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Community Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Members</span>
                <span className="font-semibold">{users.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Students</span>
                <span className="font-semibold">
                  {users.filter(u => u.user_type === 'student').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Organizers</span>
                <span className="font-semibold">
                  {users.filter(u => u.user_type === 'organizer').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Top Contributors</h2>
            <div className="space-y-4">
              {users.slice(0, 5).map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-indigo-600 w-6">
                      #{index + 1}
                    </span>
                    <span className="ml-2">{user.full_name}</span>
                  </div>
                  <span className="font-semibold">{user.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}