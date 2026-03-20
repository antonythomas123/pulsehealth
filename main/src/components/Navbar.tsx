import React from "react";
import { MdNotifications, MdAccountCircle } from "react-icons/md";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-6 py-3 w-full border-b border-slate-100 shadow-sm font-manrope antialiased tracking-tight">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tighter text-slate-900">
          PulseHealth
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full active:scale-95 duration-150 transition-colors">
          <MdNotifications className="material-symbols-outlined" />
        </button>

        <button className='"p-2 text-slate-500 hover:bg-slate-50 rounded-full active:scale-95 duration-150 transition-colors'>
          <MdAccountCircle className="material-symbols-outlined" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
