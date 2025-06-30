import React, { useEffect, useState } from 'react';

interface Event {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  category?: string;
}

export default function StudentProfile() {
  const userId = 'student1'; // TODO: Replace with real user
  const [registered, setRegistered] = useState<Event[]>([]);
  const [attended, setAttended] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const regRes = await fetch(`http://localhost:4000/api/profile/${userId}/registered`);
      const regData = await regRes.json();
      setRegistered(regData.map((r: any) => r.eventId));
      const attRes = await fetch(`http://localhost:4000/api/profile/${userId}/attended`);
      const attData = await attRes.json();
      setAttended(attData.map((r: any) => r.eventId));
      setLoading(false);
    }
    fetchProfile();
  }, [userId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Student Profile</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Registered Events</h2>
        <ul className="list-disc ml-6">
          {registered.length === 0 && <li>No registered events.</li>}
          {registered.map(ev => (
            <li key={ev.id}>{ev.title} ({new Date(ev.start_date).toLocaleDateString()})</li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Attended Events</h2>
        <ul className="list-disc ml-6">
          {attended.length === 0 && <li>No attended events.</li>}
          {attended.map(ev => (
            <li key={ev.id}>{ev.title} ({new Date(ev.start_date).toLocaleDateString()})</li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Achievements & Badges</h2>
        {/* Example badges */}
        <div className="flex gap-4">
          <span className="bg-yellow-400 text-white px-3 py-1 rounded-full">Active Participant</span>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full">Event Explorer</span>
        </div>
      </div>
    </div>
  );
}
