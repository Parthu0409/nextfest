import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Award, Bell, User } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Dummy user data for dropdown (replace with real data as needed)
  const user = {
    name: 'PottiBiscuit',
    email: 'sathsarika@example.com',
  };

  const handleSignOut = () => {
    // Remove token and reload page or redirect
    localStorage.removeItem('token');
    window.location.href = '/';
  };

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
            to="/notifications"
            className={`text-gray-300 hover:text-blue-400 p-2 rounded-full hover:bg-dark-card ${
              isActive('/notifications') ? 'bg-dark-card' : ''
            }`}
          >
            <Bell className="h-6 w-6" />
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((open) => !open)}
              className="p-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <User className="h-6 w-6" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#23243a] border border-blue-900 rounded-xl shadow-lg py-3 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-blue-900">
                  <div className="font-semibold text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-blue-900 hover:text-white rounded-b-xl transition"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}