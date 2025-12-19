import { isToday, formatWeekday } from "@/utils/calendar";
import { calendarDayNumber } from "@/styles";
import { TextMeta } from "@/components/typography";

interface CalendarDayHeaderProps {
  date: Date;
}

export function CalendarDayHeader({ date }: CalendarDayHeaderProps) {
  const today = isToday(date);
  const weekday = formatWeekday(date);
  const dayNumber = date.getDate();

  return (
    <div className="flex flex-col items-center justify-center min-w-24 py-2 border-l border-gray-200">
      <TextMeta>{weekday}</TextMeta>
      <span className={calendarDayNumber({ today })}>{dayNumber}</span>
    </div>
  );
}
