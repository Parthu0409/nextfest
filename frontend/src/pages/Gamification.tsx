import React, { useEffect, useState } from 'react';
import { Trophy, Star, Award, Target } from 'lucide-react';

interface Achievement {
  id: string;
  user_id: string;
  badge_name: string;
  description: string;
  awarded_at: string;
}

export function Gamification() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      // For demo: fetch all achievements and users, filter for user_id if needed
      const achievementsRes = await fetch('http://localhost:4000/api/notifications');
      const usersRes = await fetch('http://localhost:4000/api/users');
      const achievements = await achievementsRes.json();
      const users = await usersRes.json();
      setAchievements(achievements || []);
      setUserPoints(users.length > 0 ? users[0].points : 0); // Demo: just use first user
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }

  const badges = [
    { name: 'Event Explorer', icon: Trophy, description: 'Attend your first event', points: 50 },
    { name: 'Social Butterfly', icon: Star, description: 'Connect with 10 community members', points: 100 },
    { name: 'Rising Star', icon: Award, description: 'Earn 500 points', points: 150 },
    { name: 'Event Master', icon: Target, description: 'Attend 10 events', points: 200 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-20">Gamification</h1>
        <p className="text-gray-600">Track your progress and earn rewards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Your Progress</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-indigo-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="h-8 w-8 text-indigo-600" />
                  <span className="text-2xl font-bold text-indigo-600">{userPoints}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Total Points</h3>
                <p className="text-sm text-gray-500">Keep participating to earn more!</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-indigo-600" />
                  <span className="text-2xl font-bold text-indigo-600">
                    {achievements.length}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Achievements</h3>
                <p className="text-sm text-gray-500">Badges earned so far</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Available Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className="border border-gray-200 rounded-lg p-4 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <badge.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{badge.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{badge.description}</p>
                    <span className="text-xs font-medium text-indigo-600">
                      +{badge.points} points
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Achievements</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 border-b border-gray-200 pb-4 last:border-0"
                >
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.badge_name}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(achievement.awarded_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}