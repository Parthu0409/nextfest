import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/api/events/${id}`);
      const data = await res.json();
      setEvent(data);
      setLoading(false);
    }
    fetchEvent();
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
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <img src={event.image_url} alt={event.title} className="w-full h-64 object-cover rounded mb-4" />
      <p className="mb-2 text-gray-700">{event.description}</p>
      <div className="mb-2">Location: <span className="font-semibold">{event.location}</span></div>
      <div className="mb-2">Start: {new Date(event.start_date).toLocaleString()}</div>
      <div className="mb-2">End: {new Date(event.end_date).toLocaleString()}</div>
      <div className="mb-2">Organizer: <span className="font-semibold">{event.organizer_id}</span></div>
      <div className="flex gap-4 mt-4">
        {!registered ? (
          <button onClick={handleRegister} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Register</button>
        ) : (
          <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancel Registration</button>
        )}
        <button onClick={addToCalendar} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add to Google Calendar</button>
      </div>
    </div>
  );
}
