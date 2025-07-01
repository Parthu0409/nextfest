import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Award, Bell } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-dark-bg/90 border-2 border-blue-border shadow-lg rounded-3xl max-w-5xl w-[95vw] backdrop-blur-md">
      <div className="flex justify-between items-center h-16 px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="ml-2 text-2xl font-bold text-blue-400">NextFest</span>
          </Link>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/events"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/events')
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-300 hover:text-blue-400 hover:border-blue-400'
              }`}
            >
              <Calendar className="h-5 w-5 mr-1" />
              Events
            </Link>
            <Link
              to="/community"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/community')
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-300 hover:text-blue-400 hover:border-blue-400'
              }`}
            >
              <Users className="h-5 w-5 mr-1" />
              Community
            </Link>
            <Link
              to="/gamification"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/gamification')
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-300 hover:text-blue-400 hover:border-blue-400'
              }`}
            >
              <Award className="h-5 w-5 mr-1" />
              Rewards
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl border border-blue-border text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl bg-blue-400 text-white font-semibold hover:bg-blue-500 transition border border-blue-border"
          >
            Sign Up
          </Link>
          <Link
            to="/notifications"
            className={`text-gray-300 hover:text-blue-400 p-2 rounded-full hover:bg-dark-card ${
              isActive('/notifications') ? 'bg-dark-card' : ''
            }`}
          >
            <Bell className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}