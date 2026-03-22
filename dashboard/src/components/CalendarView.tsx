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

      {/* <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_12px_32px_rgba(25,18,30,0.04)]">
        <div className="flex items-center justify-between mb-6">
          <button className="text-sm text-outline">
            <MdChevronLeft />
          </button>
          <p className="font-headline font-bold text-sm">October 2023</p>
          <button className="text-sm text-outline">
            <MdChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-4 text-center mb-6">
          <span className="font-label text-[10px] text-outline font-bold">
            M
          </span>
          <span className="font-label text-[10px] text-outline font-bold">
            T
          </span>
          <span className="font-label text-[10px] text-outline font-bold">
            W
          </span>
          <span className="font-label text-[10px] text-outline font-bold">
            T
          </span>
          <span className="font-label text-[10px] text-outline font-bold">
            F
          </span>
          <span className="font-label text-[10px] text-outline font-bold">
            S
          </span>
          <span className="font-label text-[10px] text-outline font-bold">
            S
          </span>
          <span className="text-sm text-outline opacity-30">21</span>
          <span className="text-sm text-outline opacity-30">22</span>
          <span className="text-sm font-bold bg-primary text-white w-8 h-8 flex items-center justify-center rounded-full mx-auto">
            23
          </span>
          <span className="text-sm font-medium">24</span>
          <span className="text-sm font-medium">25</span>
          <span className="text-sm font-medium">26</span>
          <span className="text-sm font-medium">27</span>
        </div>
        <hr className="border-surface-container-high mb-6" />

        <div className="space-y-4">
          <h4 className="font-label text-[10px] text-outline font-extrabold uppercase tracking-widest">
            Next Up
          </h4>
          <div className="flex gap-4 border-l-4 border-secondary pl-4 py-1">
            <div>
              <p className="text-sm font-bold text-on-surface">12:30 PM</p>
              <p className="text-xs text-outline">Patient Intake #551</p>
            </div>
          </div>
          <div className="flex gap-4 border-l-4 border-outline-variant pl-4 py-1">
            <div>
              <p className="text-sm font-bold text-on-surface">02:00 PM</p>
              <p className="text-xs text-outline">Lunch Recess</p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default CalendarView;
