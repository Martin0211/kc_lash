// app/components/DashboardSubscribed.jsx

'use client';

import { useState, useEffect } from 'react';
import fetchSubscribed from '@/lib/fetchSubscribed';

const DashboardSubscribed = () => {
  const [latestSubscribers, setLatestSubscribers] = useState([]);

  useEffect(() => {
    const fetchLatestSubscribers = async () => {
      try {
        const data = await fetchSubscribed();
        const sortedSubscribers = data.subscribers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const recentSubscribers = sortedSubscribers.slice(0, 4);
        setLatestSubscribers(recentSubscribers);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };

    fetchLatestSubscribers();
  }, []);

  return (
    <div>
      <h2>Últimos 4 Suscriptores</h2>
      <ul>
        {latestSubscribers.map(subscriber => (
          <li key={subscriber.id}>
            {subscriber.names} {subscriber.surname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSubscribed;
