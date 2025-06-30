import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Award, Bell } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-indigo-600">NextFest</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/events"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/events')
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-5 w-5 mr-1" />
                Events
              </Link>
              <Link
                to="/community"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/community')
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-5 w-5 mr-1" />
                Community
              </Link>
              <Link
                to="/gamification"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/gamification')
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Award className="h-5 w-5 mr-1" />
                Rewards
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/notifications"
              className={`text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 ${
                isActive('/notifications') ? 'bg-gray-100' : ''
              }`}
            >
              <Bell className="h-6 w-6" />
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}