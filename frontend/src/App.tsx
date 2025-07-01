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
import EventDetails from './pages/EventDetails';
import StudentProfile from './pages/StudentProfile';
import OrganizerDashboard from './pages/OrganizerDashboard';
import OrganizerProfile from './pages/OrganizerProfile';
import EventAnalytics from './pages/EventAnalytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#101014] via-[#23243a] to-[#1e293b] opacity-100 -z-10"></div>
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/events" element={<EventDiscovery />} />
            <Route path="/community" element={<Community />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
            <Route path="/organizer/profile" element={<OrganizerProfile />} />
            <Route path="/analytics" element={<EventAnalytics />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;