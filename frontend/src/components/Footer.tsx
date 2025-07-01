import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-4 px-4 bg-dark-bg/90 border-t border-blue-border text-center text-gray-400 text-sm backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-400 text-lg">NextFest</span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <span className="text-gray-400">Empowering Student Events</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <a href="/community" className="hover:text-blue-400 transition">Community</a>
          <span className="hidden sm:inline text-gray-500">|</span>
          <a href="/events" className="hover:text-blue-400 transition">Events</a>
          <span className="hidden sm:inline text-gray-500">|</span>
          <a href="/gamification" className="hover:text-blue-400 transition">Rewards</a>
          <span className="hidden sm:inline text-gray-500">|</span>
          <a href="/notifications" className="hover:text-blue-400 transition">Notifications</a>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span>&copy; {new Date().getFullYear()} NextFest</span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <span>Made with <span className="text-blue-400">&#10084;&#65039;</span> by the NextFest Team</span>
        </div>
      </div>
    </footer>
  );
}
