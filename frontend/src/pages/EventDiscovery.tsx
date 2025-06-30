import React, { useEffect, useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  image_url?: string;
  organizer_id: string;
  category?: string; // Added to prevent runtime and type errors
}

export function EventDiscovery() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [organizerFilter, setOrganizerFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await fetch('http://localhost:4000/api/events');
      const data = await response.json();
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || (event.category ?? 'all') === category;
    const matchesDate = !dateFilter || event.start_date.startsWith(dateFilter);
    const matchesOrganizer = !organizerFilter || (event.organizer_id && event.organizer_id.toLowerCase().includes(organizerFilter.toLowerCase()));
    const matchesLocation = !locationFilter || (event.location && event.location.toLowerCase().includes(locationFilter.toLowerCase()));
    return matchesSearch && matchesCategory && matchesDate && matchesOrganizer && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Events</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="workshop">Workshops</option>
              <option value="hackathon">Hackathons</option>
              <option value="conference">Conferences</option>
              <option value="meetup">Meetups</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="date" className="text-gray-700">Date:</label>
            <input
              id="date"
              type="date"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="organizer" className="text-gray-700">Organizer:</label>
            <input
              id="organizer"
              type="text"
              placeholder="Organizer name..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={organizerFilter}
              onChange={(e) => setOrganizerFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="location" className="text-gray-700">Location:</label>
            <input
              id="location"
              type="text"
              placeholder="Location..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(event.start_date).toLocaleDateString()}</span>
                </div>
                <button
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors mt-2"
                  onClick={() => window.location.href = `/events/${event.id}`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}