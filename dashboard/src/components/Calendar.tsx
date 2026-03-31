import { useState, useMemo } from "react";
import { MdCalendarToday, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Note } from "../types/dashboard.types";

interface DayCellProps {
  date: Date;
  day: number;
}

interface MonthState {
  year: number;
  month: number;
}

type Props = {
  today: Date;
  expandedMonth: MonthState;
  setExpandedMonth: React.Dispatch<
    React.SetStateAction<{ year: number; month: number }>
  >;
  expanded: boolean;
  selected: Date;
  setSelected: React.Dispatch<React.SetStateAction<Date>>;
  hasNote: boolean;
};

const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_LABELS: string[] = ["M", "T", "W", "T", "F", "S", "S"];

function getWeekDates(ref: Date): Date[] {
  const d = new Date(ref);
  const day = d.getDay();
  const diffToMon = day === 0 ? -6 : 1 - day;
  const mon = new Date(d);
  mon.setDate(d.getDate() + diffToMon);
  return Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(mon);
    dd.setDate(mon.getDate() + i);
    return dd;
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function Calendar({
  today,
  expandedMonth,
  setExpandedMonth,
  expanded,
  selected,
  setSelected,
  hasNote
}: Props) {
  const [weekRef, setWeekRef] = useState<Date>(today);

  const weekDates = useMemo<Date[]>(() => getWeekDates(weekRef), [weekRef]);

  const monthDays = useMemo<(number | null)[]>(() => {
    const { year, month } = expandedMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const cells: (number | null)[] = Array(startOffset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [expandedMonth]);

  const isPast = (date: Date): boolean => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const t = new Date(today);
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const prevWeek = (): void => {
    const d = new Date(weekRef);
    d.setDate(d.getDate() - 7);
    setWeekRef(d);
  };

  const nextWeek = (): void => {
    const d = new Date(weekRef);
    d.setDate(d.getDate() + 7);
    setWeekRef(d);
  };

  const prevMonth = (): void => {
    setExpandedMonth(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 },
    );
  };

  const nextMonth = (): void => {
    setExpandedMonth(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 },
    );
  };

  const weekMonthLabel: string = (() => {
    const months = [...new Set(weekDates.map((d) => d.getMonth()))];
    const years = [...new Set(weekDates.map((d) => d.getFullYear()))];
    if (months.length === 1)
      return `${MONTHS[months[0]]} ${weekDates[0].getFullYear()}`;
    if (years.length === 1)
      return `${MONTHS[months[0]].slice(0, 3)} / ${MONTHS[months[1]].slice(0, 3)} ${years[0]}`;
    return `${MONTHS[months[0]].slice(0, 3)} ${weekDates[0].getFullYear()} / ${MONTHS[months[1]].slice(0, 3)} ${weekDates[6].getFullYear()}`;
  })();

  function DayCell({ date, day }: DayCellProps) {
    const past = isPast(date);
    const isToday = isSameDay(date, today);
    const isSelected = isSameDay(date, selected);
   
    const base =
      "relative flex flex-col items-center justify-center w-8 h-8 rounded-full mx-auto text-xs transition-all duration-150 outline-none";

    const variant: string = isSelected
      ? "bg-blue-600 text-white font-bold cursor-pointer"
      : past
        ? "text-slate-300 cursor-default"
        : isToday
          ? "border-2 border-blue-600 text-blue-600 font-bold cursor-pointer hover:bg-blue-50"
          : "text-slate-700 font-medium cursor-pointer hover:bg-slate-200";

    return (
      <button
        className={`${base} ${variant}`}
        disabled={past}
        onClick={() => !past && setSelected(date)}
      >
        <span className="leading-none">{day}</span>
        {hasNote && !isSelected && !past && (
          <span
            className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
              past ? "bg-slate-300" : "bg-blue-500"
            }`}
          />
        )}
      </button>
    );
  }

  return (
    <div>
      <div className="bg-slate-50 rounded-xl px-2 pt-3 pb-2.5 mb-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <button
            onClick={expanded ? prevMonth : prevWeek}
            className="text-slate-500 hover:text-slate-800 hover:bg-slate-200 p-1 rounded-md transition-all duration-150"
          >
            <MdChevronLeft />
          </button>
          <span className="text-sm font-semibold text-slate-800">
            {expanded
              ? `${MONTHS[expandedMonth.month]} ${expandedMonth.year}`
              : weekMonthLabel}
          </span>
          <button
            onClick={expanded ? nextMonth : nextWeek}
            className="text-slate-500 hover:text-slate-800 hover:bg-slate-200 p-1 rounded-md transition-all duration-150"
          >
            <MdChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              className="text-center text-xs font-semibold text-slate-400 py-0.5"
            >
              {d}
            </div>
          ))}
        </div>

        {!expanded && (
          <div className="grid grid-cols-7 gap-0.5">
            {weekDates.map((date, i) => (
              <DayCell key={i} date={date} day={date.getDate()} />
            ))}
          </div>
        )}

        {expanded && (
          <div className="grid grid-cols-7 gap-0.5">
            {monthDays.map((day, i) => {
              if (day === null)
                return <div key={`e-${i}`} className="w-8 h-8" />;
              const date = new Date(
                expandedMonth.year,
                expandedMonth.month,
                day,
              );
              return <DayCell key={i} date={date} day={day} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
