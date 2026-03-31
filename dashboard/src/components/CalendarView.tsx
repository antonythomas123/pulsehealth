import React from "react";
import { MdCalendarMonth } from "react-icons/md";
import Calendar from "./Calendar";
import type { Note, NotesMap } from "../types/dashboard.types";
import data from "../data/notes.json";

type Props = {};

interface MonthState {
  year: number;
  month: number;
}

function toKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const CalendarView = (props: Props) => {
  const today = React.useMemo<Date>(() => new Date(), []);
  const [notes, setNotes] = React.useState<NotesMap>(
    (data?.notes as NotesMap) || {},
  );

  const [selected, setSelected] = React.useState<Date>(today);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [expandedMonth, setExpandedMonth] = React.useState<MonthState>({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  
  const selectedKey = toKey(
    selected.getFullYear(),
    selected.getMonth(),
    selected.getDate(),
  );

  const toggleExpand = (): void => {
    if (!expanded) {
      setExpandedMonth({
        year: selected.getFullYear(),
        month: selected.getMonth(),
      });
    }
    setExpanded((e) => !e);
  };

  const _notes: Note[] = notes[selectedKey] ?? [];

  const hasNote =
    !!notes[
      toKey(selected.getFullYear(), selected.getMonth(), selected.getDate())
    ];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline text-md font-bold text-on-surface">
          Calendar
        </h2>
        <button
          onClick={toggleExpand}
          className={`p-1.5 rounded-lg transition-all duration-150 ${
            expanded
              ? "bg-blue-50 text-blue-600"
              : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          }`}
          title={expanded ? "Collapse to week" : "Expand to month"}
        >
          <MdCalendarMonth className="text-outline cursor-pointer" />
        </button>
      </div>
      <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_12px_32px_rgba(25,18,30,0.04)]">
        <Calendar
          today={today}
          expandedMonth={expandedMonth}
          setExpandedMonth={setExpandedMonth}
          expanded={expanded}
          selected={selected}
          setSelected={setSelected}
          hasNote={hasNote}
        />
        <div className="pb-5">
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
            Next Up
          </p>
          {_notes.length === 0 ? (
            <p className="text-sm text-slate-300 text-center py-1">
              No events scheduled
            </p>
          ) : (
            <div className="flex flex-col gap-3.5">
              {_notes.map((note, i) => (
                <div key={i} className="flex items-stretch gap-3">
                  <div
                    className={`w-0.5 rounded-full flex-shrink-0 ${
                      note.primary ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-tight">
                      {note.time}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {note.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default CalendarView;
