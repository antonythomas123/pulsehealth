import React from "react";
import { MdDashboard, MdAnalytics, MdGroup, MdAdd } from "react-icons/md";

type MenuItem = {
  name: string;
  route: string;
  icon: React.ReactNode;
};

const menu: MenuItem[] = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Analytics",
    route: "/analytics",
    icon: <MdAnalytics />,
  },
  {
    name: "Patients",
    route: "/patients",
    icon: <MdGroup />,
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 z-40 bg-slate-50 border-r border-slate-100 flex flex-col h-full p-4 space-y-2 pt-24 font-manrope text-sm font-medium">
      {menu.map((item) => (
        <a
          key={item.name}
          href={item.route}
          className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-700 hover:bg-white hover:shadow-sm rounded-lg transition-all active:translate-x-1 duration-200"
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="font-manrope text-sm font-medium">{item.name}</span>
        </a>
      ))}

      <div className="mt-auto pb-4 px-4">
        <button className="w-full clinical-gradient text-white py-3 rounded-lg font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer">
          <MdAdd className="material-symbols-outlined text-sm" />
          New Record
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
