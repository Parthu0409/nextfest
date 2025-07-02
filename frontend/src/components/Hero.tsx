import React from 'react';
import { Calendar, Users, Award, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SecondaryNavbar } from '../components/SecondaryNavbar';

export function Hero() {
  return (
    <>
      <SecondaryNavbar />
      <div className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#101014] via-[#23243a] to-[#1e293b] opacity-100"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-10 mb-8">
              Welcome to NextFest
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Your one-stop platform for discovering, organizing, and participating in
              college events. Join the community and enhance your college experience!
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <div className="bg-dark-card rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">For Students</h2>
                <p className="text-gray-300 mb-6">
                  Join thousands of students who are actively enhancing their coding skills, confidently preparing for their future careers, connecting with like-minded learners.
                </p>
                <Link
                  to="/signup?role=student"
                  className="inline-block bg-blue-400 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-500"
                >
                  Join as Student
                </Link>
              </div>

              <div className="bg-dark-card rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">For Organizers</h2>
                <p className="text-gray-300 mb-6">
                  Create, manage, and host coding events, hackathons, and workshops.
                  Connect with talented students and build an engaging tech community.
                </p>
                <Link
                  to="/signup?role=organizer"
                  className="inline-block bg-blue-400 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-500"
                >
                  Join as Organizer
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="bg-dark-card bg-opacity-90 rounded-lg p-6 text-center">
                <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Event Discovery</h3>
                <p className="text-gray-400">Browse and filter events based on your interests</p>
              </div>

              <div className="bg-dark-card bg-opacity-90 rounded-lg p-6 text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Community</h3>
                <p className="text-gray-400">Connect with fellow students and organizers</p>
              </div>

              <div className="bg-dark-card bg-opacity-90 rounded-lg p-6 text-center">
                <Award className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Gamification</h3>
                <p className="text-gray-400">Earn points and badges for participation</p>
              </div>

              <div className="bg-dark-card bg-opacity-90 rounded-lg p-6 text-center">
                <Bell className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Real-time Updates</h3>
                <p className="text-gray-400">Stay informed with instant notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}