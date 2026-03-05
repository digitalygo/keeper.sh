import { useAtomValue, useSetAtom } from "jotai";
import { tv } from "tailwind-variants/lite";
import { eventGraphHoverIndexAtom } from "../../state/event-graph-hover";
import { Text } from "../ui/text";

interface EventBlock {
  startHour: number;
  endHour: number;
  dayOffset: number;
}

// TODO: Replace with real event data from API
const MOCK_EVENTS: EventBlock[] = [
  { startHour: 10, endHour: 11.5, dayOffset: -7 },
  { startHour: 14, endHour: 15, dayOffset: -6 },
  { startHour: 9, endHour: 10, dayOffset: -6 },
  { startHour: 11, endHour: 13, dayOffset: -5 },
  { startHour: 15, endHour: 17, dayOffset: -5 },
  { startHour: 9, endHour: 10.5, dayOffset: -4 },
  { startHour: 13, endHour: 14.5, dayOffset: -4 },
  { startHour: 15, endHour: 16, dayOffset: -4 },
  { startHour: 10, endHour: 12, dayOffset: -3 },
  { startHour: 8, endHour: 9, dayOffset: -2 },
  { startHour: 11, endHour: 13, dayOffset: -2 },
  { startHour: 14, endHour: 15.5, dayOffset: -2 },
  { startHour: 9, endHour: 11, dayOffset: -1 },
  { startHour: 14, endHour: 16, dayOffset: -1 },
  { startHour: 9, endHour: 10.5, dayOffset: 0 },
  { startHour: 13, endHour: 14, dayOffset: 0 },
  { startHour: 15, endHour: 16.5, dayOffset: 0 },
  { startHour: 10, endHour: 12, dayOffset: 1 },
  { startHour: 14, endHour: 15, dayOffset: 1 },
  { startHour: 8, endHour: 9.5, dayOffset: 2 },
  { startHour: 11, endHour: 13, dayOffset: 2 },
  { startHour: 15, endHour: 17, dayOffset: 2 },
  { startHour: 16, endHour: 17.5, dayOffset: 2 },
  { startHour: 9, endHour: 10, dayOffset: 3 },
  { startHour: 10, endHour: 11.5, dayOffset: 4 },
  { startHour: 13, endHour: 14.5, dayOffset: 4 },
  { startHour: 15, endHour: 16, dayOffset: 4 },
  { startHour: 9, endHour: 11, dayOffset: 5 },
  { startHour: 14, endHour: 16, dayOffset: 5 },
  { startHour: 10, endHour: 12.5, dayOffset: 6 },
  { startHour: 8, endHour: 9, dayOffset: 7 },
  { startHour: 11, endHour: 13, dayOffset: 7 },
];

const DAYS_BEFORE = 7;
const DAYS_AFTER = 7;
const TOTAL_DAYS = DAYS_BEFORE + 1 + DAYS_AFTER;
const GRAPH_HEIGHT = 96;
const MIN_BAR_PERCENT = 5;

const graphBar = tv({
  base: "flex-1 rounded-[0.625rem]",
  variants: {
    period: {
      past: "bg-background-hover border border-border-elevated",
      today: "bg-emerald-400 border-transparent",
      future:
        "bg-emerald-400 border-emerald-500 bg-[repeating-linear-gradient(-45deg,transparent_0_4px,var(--color-illustration-stripe)_4px_8px)]",
    },
  },
});

type Period = "past" | "today" | "future";

const resolvePeriod = (dayOffset: number): Period => {
  if (dayOffset < 0) return "past";
  if (dayOffset === 0) return "today";
  return "future";
};

const countEventsByDay = (events: EventBlock[]): number[] => {
  const counts = new Array<number>(TOTAL_DAYS).fill(0);
  for (const event of events) {
    const slotIndex = event.dayOffset + DAYS_BEFORE;
    if (slotIndex >= 0 && slotIndex < TOTAL_DAYS) counts[slotIndex]++;
  }
  return counts;
};

interface DayData {
  count: number;
  dayOffset: number;
  heightPercent: number;
  fullLabel: string;
  period: Period;
}

/** Format a date offset from today into a human-readable label. */
const formatDayLabel = (dayOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

function resolveBarHeight(count: number, maxCount: number): number {
  if (count === 0) return MIN_BAR_PERCENT;
  return (count / maxCount) * 100;
}

const normalizeDayData = (counts: number[]): DayData[] => {
  const maxCount = Math.max(...counts, 1);

  return counts.map((count, slotIndex) => {
    const dayOffset = slotIndex - DAYS_BEFORE;
    return {
      count,
      dayOffset,
      heightPercent: resolveBarHeight(count, maxCount),
      fullLabel: formatDayLabel(dayOffset),
      period: resolvePeriod(dayOffset),
    };
  });
};

const buildDays = (events: EventBlock[]): DayData[] => {
  const counts = countEventsByDay(events);
  return normalizeDayData(counts);
};

function resolveActiveDay(hoverIndex: number | null, days: DayData[], today: DayData): DayData {
  if (hoverIndex !== null) return days[hoverIndex];
  return today;
}

function resolveEventCountLabel(count: number): string {
  if (count === 1) return "1 event";
  return `${count} events`;
}

interface EventGraphSummaryProps {
  days: DayData[];
}

function EventGraphSummary({ days }: EventGraphSummaryProps) {
  const hoverIndex = useAtomValue(eventGraphHoverIndexAtom);
  const today = days[DAYS_BEFORE];
  const activeDay = resolveActiveDay(hoverIndex, days, today);
  const eventCountLabel = resolveEventCountLabel(activeDay.count);

  return (
    <div className="flex items-center justify-between">
      <Text size="sm" tone="muted" className="tabular-nums text-right">
        {eventCountLabel}
      </Text>
      <Text size="sm" tone="muted" className="tabular-nums text-right">
        {activeDay.fullLabel}
      </Text>
    </div>
  );
}

export function EventGraph() {
  const days = buildDays(MOCK_EVENTS);
  const setHoverIndex = useSetAtom(eventGraphHoverIndexAtom);

  return (
    <div className="flex flex-col gap-6">
      <EventGraphSummary days={days} />

      <div
        className="flex gap-0.5 [&:hover>*]:opacity-50 [&>*:hover]:opacity-100"
        onPointerLeave={() => setHoverIndex(null)}
      >
        {days.map((day, dayIndex) => (
          <div
            key={day.dayOffset}
            className="flex-1 flex flex-col gap-2"
            onPointerEnter={() => setHoverIndex(dayIndex)}
          >
            <div
              className="flex items-end"
              style={{ height: GRAPH_HEIGHT }}
            >
              <div
                className={graphBar({
                  period: day.period,
                  className: "w-full",
                })}
                style={{ height: `${day.heightPercent}%` }}
              />
            </div>
            <Text
              size="xs"
              tone="default"
              align="center"
              className="font-mono leading-none select-none"
            >
              {day.dayOffset}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
