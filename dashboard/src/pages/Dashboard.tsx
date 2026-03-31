import React from "react";
import {
  MdNotes,
  MdCalendarToday,
  MdOutlinePriorityHigh,
  MdChevronRight,
  MdChevronLeft,
  MdCalendarMonth,
  MdOutlinePerson,
} from "react-icons/md";
import { useAppSelector } from "main/redux/hooks";
import { selectCurrentUser } from "auth/redux/auth";
import RecentActivity from "../components/RecentActivity";
import type { Record } from "../types/dashboard.types";
import data from "../data/records.json";
import StatusCard from "../components/StatusCard";
import CalendarView from "../components/CalendarView";

type Props = {};

const Dashboard = (props: Props) => {
  const [recentActivity, setRecentActivity] = React.useState<Record[]>(
    (data?.records as Record[]) || [],
  );
  const currentUser = useAppSelector(selectCurrentUser);
  const fullName = currentUser?.displayName?.trim() || "Doctor";
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div>
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline font-extrabold text-2xl text-on-surface tracking-tight mb-2">
            Good Morning, {fullName}
          </h1>
          <p className="font-label text-outline text-sm font-semibold uppercase tracking-widest">
            {today}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full">
          <MdNotes className="material-symbols-outlined text-secondary" />
          <span className="text-sm font-medium text-on-surface-variant">
            4 Active Consultations
          </span>
        </div>
      </header>

      <section className="grid! grid-cols-1! md:grid-cols-12! gap-6 mb-10">
        <StatusCard
          icon={<MdOutlinePerson />}
          iconType="primary"
          title="Total Patients"
          count={"1,284"}
          trendingCount={12}
          className="bg-surface-container-lowest border-b-2 border-primary"
        />

        <StatusCard
          icon={<MdCalendarToday />}
          iconType="secondary"
          title="New Appointments"
          count={"18"}
          subtitle="Scheduled for today"
          className="bg-surface-container-lowest"
        />

        <StatusCard
          icon={<MdOutlinePriorityHigh />}
          iconType="error"
          title="Pending Reports"
          count={"07"}
          label="Urgent"
          className="bg-error-container!"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RecentActivity records={recentActivity} />

        <div className="space-y-6">
          <CalendarView />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
