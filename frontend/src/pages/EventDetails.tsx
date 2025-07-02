import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sampleEvents } from '../lib/sampleEvents';
import { Calendar, MapPin, User, Clock, Award } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  image_url?: string;
  organizer_id: string;
  category?: string;
}

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    // Use sampleEvents for demo
    const found = sampleEvents.find(e => e.id === id);
    // If not found, try to find by string id (for newly created events)
    setEvent(found || null);
    setLoading(false);
  }, [id]);

  const handleRegister = async () => {
    await fetch('http://localhost:4000/api/registrations/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: id, userId: 'student1' }) // TODO: Replace with real user
    });
    setRegistered(true);
  };

  const handleCancel = async () => {
    await fetch('http://localhost:4000/api/registrations/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: id, userId: 'student1' })
    });
    setRegistered(false);
  };

  const addToCalendar = () => {
    if (!event) return;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start_date.replace(/[-:]/g, '').replace('T', 'T').slice(0, 15)}/${event.end_date.replace(/[-:]/g, '').replace('T', 'T').slice(0, 15)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!event) return <div className="text-center py-8">Event not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-[#23243a] rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center border border-blue-900">
        <div className="flex-1 w-full">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">{event.title}</h1>
          <div className="flex items-center gap-4 mb-4 text-blue-300">
            <User className="h-5 w-5" />
            <span className="font-medium">Organizer:</span>
            <span>{event.organizer?.name || event.organizer_id}</span>
          </div>
          <div className="flex items-center gap-4 mb-4 text-blue-300">
            <Calendar className="h-5 w-5" />
            <span>{event.date || event.start_date}</span>
            <Clock className="h-5 w-5 ml-4" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <div className="flex items-center gap-4 mb-4 text-blue-300">
            <MapPin className="h-5 w-5" />
            <span>{event.location}</span>
          </div>
          <div className="mb-6 text-white text-lg leading-relaxed">
            {event.description}
          </div>
          <div className="flex gap-4 mb-6">
            {!registered ? (
              <button onClick={() => setRegistered(true)} className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">Register</button>
            ) : (
              <button onClick={() => setRegistered(false)} className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Cancel Registration</button>
            )}
            <a
              href={event.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Add to Google Calendar
            </a>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Award className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-300 text-sm">{event.views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}
