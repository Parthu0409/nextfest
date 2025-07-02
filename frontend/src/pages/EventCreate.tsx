import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleEvents } from '../lib/sampleEvents';

export function EventCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    organizer: { id: 'org1', name: 'Tech Society', email: 'techsoc@nextfest.com' },
  });
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.title || !form.description || !form.category || !form.date || !form.startTime || !form.endTime || !form.location) {
      setError('Please fill all fields.');
      return;
    }
    // Simulate adding to sampleEvents (in real app, POST to backend)
    sampleEvents.push({
      id: (sampleEvents.length + 1).toString(),
      ...form,
      status: 'upcoming',
      registeredStudents: [],
      attendees: [],
      views: 0,
      feedback: [],
      calendarLink: '',
    });
    navigate('/events');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#101014] via-[#23243a] to-[#1e293b] py-16">
      <form onSubmit={handleSubmit} className="bg-dark-card border-2 border-blue-border rounded-2xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Create New Event</h2>
        {error && <div className="mb-4 text-red-400">{error}</div>}
        <div className="mb-4">
          <label className="block text-white mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 rounded bg-[#23243a] border border-blue-900 text-white" />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full px-3 py-2 rounded bg-[#23243a] border border-blue-900 text-white" />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 rounded bg-[#23243a] border border-blue-900 text-white" />
        </div>
        <div className="mb-4 flex gap-2">
          <div className="flex-1">
            <label className="block text-white mb-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-3 py-2 rounded bg-[#23243a] border border-blue-900 text-white" />
          </div>
          <div className="flex-1">
            <label className="block text-white mb-1">Start Time</label>
            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="w-full px-3 py-2 rounded bg-[#23243a] border border-blue-900 text-white" />
          </div>
          <div className="flex-1">
            <label className="block text-white mb-1">End Time</label>
            <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="w-full px-3 py-2 rounded bg-[#23243a] border border-blue-900 text-white" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 rounded bg-[#23243a] border border-blue-900 text-white" />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mt-4">Create Event</button>
      </form>
    </div>
  );
}
