import React, { useEffect, useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { sampleEvents } from '../lib/sampleEvents';

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
    // Function to load events from localStorage and merge with sampleEvents (no duplicates)
    const loadEvents = () => {
      const storedEvents = localStorage.getItem('events');
      let userEvents: Event[] = [];
      if (storedEvents) {
        try {
          userEvents = JSON.parse(storedEvents);
        } catch {
          userEvents = [];
        }
      }
      // Merge sampleEvents and userEvents, avoiding duplicates by id
      const allEventsMap = new Map();
      sampleEvents.forEach(e => {
        allEventsMap.set(e.id, {
          id: e.id,
          title: e.title,
          description: e.description,
          start_date: e.date,
          end_date: e.date,
          location: e.location,
          image_url: '',
          organizer_id: e.organizer.name,
          category: e.category,
          startTime: e.startTime,
          endTime: e.endTime,
          organizer: e.organizer,
          status: e.status,
          views: e.views,
          feedback: e.feedback,
          calendarLink: e.calendarLink,
        });
      });
      userEvents.forEach(e => {
        allEventsMap.set(e.id, e);
      });
      setEvents(Array.from(allEventsMap.values()));
      setLoading(false);
    };

    loadEvents();

    // Reload events when the page regains focus
    window.addEventListener('focus', loadEvents);
    return () => {
      window.removeEventListener('focus', loadEvents);
    };
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || (event.category ?? 'all') === category;
    const matchesDate = !dateFilter || event.start_date.startsWith(dateFilter);
    const matchesOrganizer = !organizerFilter || (event.organizer_id && event.organizer_id.toLowerCase().includes(organizerFilter.toLowerCase()));
    const matchesLocation = !locationFilter || (event.location && event.location.toLowerCase().includes(locationFilter.toLowerCase()));
    return matchesSearch && matchesCategory && matchesDate && matchesOrganizer && matchesLocation;
  });

  // Simulate user type (replace with real auth logic)
  const userType = localStorage.getItem('userType') || 'student';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 mt-20">Discover Events</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full border border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-dark-card text-white placeholder:text-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-blue-400 h-5 w-5" />
            <select
              className="border border-blue-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-dark-card text-white"
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
            <label htmlFor="date" className="text-white">Date:</label>
            <input
              id="date"
              type="date"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="organizer" className="text-white">Organizer:</label>
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
            <label htmlFor="location" className="text-white">Location:</label>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-dark-card rounded-lg shadow-md overflow-hidden">
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-blue-300 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center text-blue-400 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(event.start_date).toLocaleDateString()}</span>
                </div>
                <button
                  className="w-full bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors mt-2"
                  onClick={() => window.location.href = `/events/${event.id}`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userType === 'organizer' && (
        <button
          className="fixed bottom-10 right-10 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-4xl transition-all duration-200"
          title="Create Event"
          onClick={() => window.location.href = '/eventcreate'}
        >
          +
        </button>
      )}
    </div>
  );
}