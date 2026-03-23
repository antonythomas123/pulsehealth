import React, { useEffect, useRef, useState } from "react";
import {
  MdFormatListBulleted,
  MdGridView,
  MdFilterList,
} from "react-icons/md";
import GridView from "../components/GridView";
import ListView from "../components/ListView";
import type { Patient } from "../types/patients.types";
import data from "../data/patients.json";

const Patients = () => {
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [patients, setPatients] = useState<Patient[]>(
    (data?.patients as Patient[]) || [],
  );

  const listBtnRef = useRef<HTMLButtonElement>(null);
  const gridBtnRef = useRef<HTMLButtonElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeBtn = isGridView ? gridBtnRef.current : listBtnRef.current;
    const listBtn = listBtnRef.current;
    if (!activeBtn || !pillRef.current || !listBtn) return;

    pillRef.current.style.width = `${activeBtn.offsetWidth}px`;
    pillRef.current.style.transform = isGridView
      ? `translateX(${listBtn.offsetWidth}px)`
      : `translateX(0)`;

    const active = isGridView ? gridRef.current : listRef.current;
    if (containerRef.current && active) {
      containerRef.current.style.height = `${active.offsetHeight}px`;
    }
  }, [isGridView]);

  return (
    <div>
      <header className="mb-10 flex flex-col md:flex-row justify-between gap-6 items-start">
        <div>
          <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
            Patient Directory
          </h1>
          <p className="text-on-surface-variant text-sm font-body mt-2">
            Manage clinical records and patient engagement metrics.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-surface-container-high p-1.5 rounded-xl flex items-center relative">
            <div
              ref={pillRef}
              className="absolute top-1.5 left-1.5 h-[calc(100%-12px)] rounded-lg bg-white shadow-sm
               transition-[transform,width] duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)]
               pointer-events-none z-0"
            />

            <button
              ref={listBtnRef}
              onClick={() => setIsGridView(false)}
              className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-lg transition-colors
                ${!isGridView ? "text-primary" : "text-outline-variant"}`}
            >
              <MdFormatListBulleted className="text-[20px]" />
              <span className="text-xs font-semibold">List</span>
            </button>

            <button
              ref={gridBtnRef}
              onClick={() => setIsGridView(true)}
              className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-lg transition-colors
                ${isGridView ? "text-primary" : "text-outline-variant"}`}
            >
              <MdGridView className="text-[20px]" />
              <span className="text-xs font-semibold">Grid</span>
            </button>
          </div>

          {!isGridView && (
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm font-medium hover:bg-surface-container-low transition-colors">
              <MdFilterList className="text-[18px]" />
              Filters
            </button>
          )}
        </div>
      </header>

      <div
        ref={containerRef}
        className="relative overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
      >
        <div
          ref={listRef}
          className="absolute inset-x-0 top-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
          style={{
            transform: isGridView ? "translateX(-100%)" : "translateX(0)",
          }}
        >
          <ListView patients={patients} />
        </div>

        <div
          ref={gridRef}
          className="absolute inset-x-0 top-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
          style={{
            transform: isGridView ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <GridView patients={patients} />
        </div>
      </div>
    </div>
  );
};

export default Patients;
