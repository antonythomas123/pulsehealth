import React from "react";
import PatientCard from "./PatientCard";
import { MdOutlineSearch } from "react-icons/md";
import type { Patient } from "../types/patients.types";

type Props = {
  patients: Patient[];
};

const GridView = ({ patients }: Props) => {
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes("".toLowerCase()),
  );

  return (
    <div>
      <div className="mb-10 w-full">
        <div className="relative max-w-none">
          <MdOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />

          <input
            className="w-full pl-12 pr-4 py-2 bg-surface-container-high outline-none border-none rounded-xl focus:ring-0 border-b-2 border-transparent focus:border-primary transition-all font-body text-base shadow-sm"
            placeholder="Search by name or ID"
            type="text"
          />
        </div>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.length > 0 ? (
          filteredPatients?.map((patient) => (
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
          ))
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
