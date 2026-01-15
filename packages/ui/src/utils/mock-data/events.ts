import { createDate } from "../../utils/date-helpers";

export interface PlaygroundEvent {
  id: string;
  name: string;
  sourceCalendar: string;
  startTime: Date;
  endTime: Date;
}

export const TODAY_EVENTS: PlaygroundEvent[] = [
  {
    id: "1",
    name: "Team Standup",
    sourceCalendar: "Work",
    startTime: createDate(0, 9, 0),
    endTime: createDate(0, 9, 30),
  },
  {
    id: "2",
    name: "Design Review",
    sourceCalendar: "Work",
    startTime: createDate(0, 11, 0),
    endTime: createDate(0, 12, 0),
  },
  {
    id: "3",
    name: "Lunch with Sarah",
    sourceCalendar: "Personal",
    startTime: createDate(0, 12, 30),
    endTime: createDate(0, 13, 30),
  },
  {
    id: "4",
    name: "Project Planning",
    sourceCalendar: "Work",
    startTime: createDate(0, 14, 0),
    endTime: createDate(0, 15, 0),
  },
  {
    id: "5",
    name: "Gym",
    sourceCalendar: "Personal",
    startTime: createDate(0, 18, 0),
    endTime: createDate(0, 19, 0),
  },
];

export const TOMORROW_EVENTS: PlaygroundEvent[] = [
  {
    id: "6",
    name: "Weekly Sync",
    sourceCalendar: "Work",
    startTime: createDate(1, 10, 0),
    endTime: createDate(1, 11, 0),
  },
  {
    id: "7",
    name: "Coffee with Alex",
    sourceCalendar: "Personal",
    startTime: createDate(1, 14, 0),
    endTime: createDate(1, 15, 0),
  },
  {
    id: "8",
    name: "Sprint Retro",
    sourceCalendar: "Work",
    startTime: createDate(1, 16, 0),
    endTime: createDate(1, 17, 0),
  },
];

const EVENT_TEMPLATES = [
  { name: "Team Standup", sourceCalendar: "Work", duration: 30 },
  { name: "Design Review", sourceCalendar: "Work", duration: 60 },
  { name: "Lunch", sourceCalendar: "Personal", duration: 60 },
  { name: "Project Planning", sourceCalendar: "Work", duration: 60 },
  { name: "1:1 with Manager", sourceCalendar: "Work", duration: 30 },
  { name: "Gym", sourceCalendar: "Personal", duration: 60 },
  { name: "Coffee Chat", sourceCalendar: "Personal", duration: 45 },
  { name: "Sprint Retro", sourceCalendar: "Work", duration: 60 },
  { name: "Weekly Sync", sourceCalendar: "Work", duration: 60 },
  { name: "Dentist Appointment", sourceCalendar: "Personal", duration: 60 },
  { name: "Code Review", sourceCalendar: "Work", duration: 45 },
  { name: "Team Lunch", sourceCalendar: "Work", duration: 90 },
];

const getStartMinute = (random: number): number => {
  if (random > 0.5) {
    return 0;
  }
  return 30;
};

const generateEventsForDay = (dayOffset: number, baseId: number): PlaygroundEvent[] => {
  const eventsPerDay = 3 + Math.floor(Math.random() * 3);
  const events: PlaygroundEvent[] = [];
  const usedHours = new Set<number>();

  for (let index = 0; index < eventsPerDay; index++) {
    const templateIndex = Math.floor(Math.random() * EVENT_TEMPLATES.length);
    const template = EVENT_TEMPLATES[templateIndex]!;
    let startHour = 0;

    do {
      startHour = 8 + Math.floor(Math.random() * 10);
    } while (usedHours.has(startHour));

    usedHours.add(startHour);

    const startMinute = getStartMinute(Math.random());

    events.push({
      id: `${baseId + index}`,
      name: template.name,
      sourceCalendar: template.sourceCalendar,
      startTime: createDate(dayOffset, startHour, startMinute),
      endTime: createDate(dayOffset, startHour, startMinute + template.duration),
    });
  }

  return events.toSorted((eventA, eventB) => eventA.startTime.getTime() - eventB.startTime.getTime());
};

export const generateWeekEvents = (): PlaygroundEvent[] => {
  const events: PlaygroundEvent[] = [];
  let idCounter = 1;

  for (let day = 0; day < 7; day++) {
    const dayEvents = generateEventsForDay(day, idCounter);
    events.push(...dayEvents);
    idCounter += dayEvents.length;
  }

  return events;
};

export const WEEK_EVENTS = generateWeekEvents();
