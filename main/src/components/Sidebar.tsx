import React from "react";
import { MdDashboard, MdAnalytics, MdGroup, MdAdd, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector, selectIsMobileSidebarOpen } from "../redux/hooks";
import { closeMobileSidebar } from "../redux/slices/responsiveUI";

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
  const dispatch = useAppDispatch();
  const isMobileSidebarOpen = useAppSelector(selectIsMobileSidebarOpen);

  const handleNavLinkClick = () => {
    dispatch(closeMobileSidebar());
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => dispatch(closeMobileSidebar())}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative md:flex h-full w-64 z-40 bg-slate-50 border-r border-slate-100 flex-col p-4 space-y-2 font-manrope text-sm font-medium transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-slate-600 hover:text-slate-900"
          onClick={() => dispatch(closeMobileSidebar())}
        >
          <MdClose className="text-xl" />
        </button>

        <div className="md:hidden h-12" />

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.route}
            onClick={handleNavLinkClick}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-3 
              text-sm font-medium rounded-lg transition-all duration-200
              ${
                isActive
                  ? "text-blue-700 bg-white shadow-sm translate-x-1"
                  : "text-slate-600 hover:text-blue-700 hover:bg-white hover:shadow-sm"
              }
              `
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-manrope text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}

        <div className="mt-auto pb-4 px-4">
          <button className="w-full clinical-gradient text-white py-3 rounded-lg font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer">
            <MdAdd className="material-symbols-outlined text-sm" />
            New Record
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
