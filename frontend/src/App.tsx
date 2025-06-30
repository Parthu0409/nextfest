import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventDiscovery } from './pages/EventDiscovery';
import { Community } from './pages/Community';
import { Gamification } from './pages/Gamification';
import { Notifications } from './pages/Notifications';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/events" element={<EventDiscovery />} />
          <Route path="/community" element={<Community />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App