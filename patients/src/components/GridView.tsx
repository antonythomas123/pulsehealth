import React, { useCallback, useEffect, useRef, useState } from "react";
import PatientCard from "./PatientCard";
import { MdOutlineSearch } from "react-icons/md";
import type { Patient } from "../types/patients.types";

type Props = {
  patients: Patient[];
};

const ITEMS_PER_PAGE = 6;

const GridView = ({ patients }: Props) => {
  const [search, setSearch] = React.useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toString().includes(search.toString()),
  );

  const visiblePatients = filteredPatients.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = visiblePatients.length < filteredPatients.length;

  const lastRecordRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting && hasMore) {
            setIsLoading(true);

            setTimeout(() => {
              setPage((prev) => prev + 1);
              setIsLoading(false);
            }, 800);
          }
        },
        { threshold: 0.1 }
      );

      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading],
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 mb-6 w-full">
        <div className="relative max-w-none">
          <MdOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />

          <input
            className="w-full pl-12 pr-4 py-2 bg-surface-container-high outline-none border-none rounded-xl focus:ring-0 border-b-2 border-transparent focus:border-primary transition-all font-body text-base shadow-sm"
            placeholder="Search by name or ID"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <section className="flex-1 min-h-0 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 content-start">
        {visiblePatients.length > 0 ? (
          <>
            {visiblePatients.map((patient) => (
              <PatientCard
                key={patient.id}
                id={patient.id}
                img={patient.img}
                name={patient.name}
                status={patient.status}
                age={patient.age}
                gender={patient.gender}
                diagnosis={patient.diagnosis}
                lastVisit={patient.lastVisit}
              />
            ))}
            {hasMore && (
              <div ref={lastRecordRef} className="col-span-full h-4" />
            )}
            {isLoading && (
              <div className="col-span-full flex justify-center py-6">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No patients found.
          </p>
        )}
      </section>
    </div>
  );
};

export default GridView;
