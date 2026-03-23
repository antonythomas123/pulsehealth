import React, { useEffect } from "react";
import Table from "./Table";
import type { Column, Patient, StatusVariant } from "../types/patients.types";
import AvatarCell from "./AvatarCell";
import StatusBadge from "./StatusBadge";

type Props = {
  patients: Patient[];
};

const ListView = ({ patients }: Props) => {
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(
    Math.ceil(patients.length / 10),
  );

  const columns: Column<Patient>[] = [
    {
      key: "name",
      header: "Patient Name",
      render: (row) => (
        <AvatarCell
          src={row.img}
          primary={row.name}
          secondary={`${row.gender}, ${row.age} yrs`}
        />
      ),
    },
    {
      key: "patientId",
      header: "Patient ID",
      render: (row) => (
        <span className="text-sm font-medium text-on-surface-variant">
          #{row.id}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "diagnosis",
      header: "Diagnosis",
    },
    {
      key: "lastVisit",
      header: "Last Visit",
      render: (row) => (
        <span className="text-sm text-on-surface-variant">{row.lastVisit}</span>
      ),
    },
  ];

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = patients.slice(startIndex, endIndex);

  return (
    <div className="h-full flex flex-col">
      <Table<Patient>
        columns={columns}
        data={paginatedPatients}
        totalCount={patients?.length}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ListView;
