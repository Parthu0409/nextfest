import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle, Calendar, Users } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const response = await fetch('http://localhost:4000/api/notifications');
      const data = await response.json();
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(notificationId: string) {
    try {
      await fetch(`http://localhost:4000/api/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      setNotifications(notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return Calendar;
      case 'achievement':
        return CheckCircle;
      case 'social':
        return Users;
      default:
        return Bell;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-20">Notifications</h1>
        <p className="text-gray-600">Stay updated with your latest activities</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No notifications yet</h3>
            <p className="text-gray-500">We'll notify you when something important happens</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-6 flex items-start space-x-4 ${
                    notification.read ? 'bg-white' : 'bg-indigo-50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="flex-shrink-0 text-indigo-600 hover:text-indigo-800"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}