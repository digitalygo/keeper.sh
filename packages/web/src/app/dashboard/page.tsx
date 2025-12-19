"use client";

import { useState, useEffect } from "react";
import { Calendar, CalendarEvent } from "@/components/calendar";

interface ApiEvent {
  id: string;
  startTime: string;
  endTime: string;
  calendarId: string;
  sourceName: string;
}

export default function DashboardPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) return;

        const data: ApiEvent[] = await response.json();
        const parsed = data.map((event) => ({
          id: event.id,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
          calendarId: event.calendarId,
          sourceName: event.sourceName,
        }));

        setEvents(parsed);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 min-h-0">
      <Calendar events={events} />
    </div>
  );
}
