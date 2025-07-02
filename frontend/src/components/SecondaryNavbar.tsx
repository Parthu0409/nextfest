import React from 'react';
import { Link } from 'react-router-dom';

export function SecondaryNavbar() {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-dark-bg/90 border-2 border-blue-border shadow-lg rounded-3xl max-w-5xl w-[95vw] backdrop-blur-md">
      <div className="flex justify-between items-center h-16 px-6">
        <Link to="/" className="flex items-center">
          <span className="ml-2 text-2xl font-bold text-blue-400">NextFest</span>
        </Link>
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
        </div>
      </div>
    </nav>
  );
}
