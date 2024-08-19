"use client";

import React, { useEffect, useState } from "react";
import { fetchSubscribed } from "@/utils/fetch";

const DashboardSubscribed = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSubscribers() {
      try {
        const data = await fetchSubscribed();
        // Ordenamos los suscriptores por fecha de creación (de más reciente a más antiguo)
        // y tomamos los últimos 5
        const sortedSubscribers = data.subscribers
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        setSubscribers(sortedSubscribers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading subscribers:", error);
        setIsLoading(false);
      }
    }

    loadSubscribers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Latest Subscribers
          </h5>
          <a
            href="/dashboard/subscribed"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {subscribers.map((subscriber, index) => (
              <li
                key={subscriber.id}
                className={`py-3 sm:py-4 ${
                  index === subscribers.length - 1 ? "pb-0" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-slate-600"></div>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {subscriber.names} {subscriber.surname}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {subscriber.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {subscriber.phone_number || "N/A"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardSubscribed;
