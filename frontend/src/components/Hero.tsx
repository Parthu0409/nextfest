import React from 'react';
import { Calendar, Users, Award, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 opacity-90"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
            Welcome to NextFest
          </h1>
          <p className="text-xl text-white mb-12 max-w-3xl mx-auto">
            Your one-stop platform for discovering, organizing, and participating in
            college events. Join the community and enhance your college experience!
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">For Students</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of students who are enhancing their coding skills,
                preparing for their future careers, and connecting with like-minded
                learners.
              </p>
              <Link
                to="/signup?role=student"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700"
              >
                Join as Student
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">For Organizers</h2>
              <p className="text-gray-600 mb-6">
                Create, manage, and host coding events, hackathons, and workshops.
                Connect with talented students and build an engaging tech community.
              </p>
              <Link
                to="/signup?role=organizer"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700"
              >
                Join as Organizer
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center">
              <Calendar className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Event Discovery</h3>
              <p className="text-gray-600">Browse and filter events based on your interests</p>
            </div>

            <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center">
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Connect with fellow students and organizers</p>
            </div>

            <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center">
              <Award className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gamification</h3>
              <p className="text-gray-600">Earn points and badges for participation</p>
            </div>

            <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center">
              <Bell className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">Stay informed with instant notifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}