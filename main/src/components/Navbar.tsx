import React from "react";
import {
  MdNotifications,
  MdLogout,
  MdOutlineMenu,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleMobileSidebar } from "../redux/slices/responsiveUI";
import { selectCurrentUser, signOutUser } from "auth/redux/auth";

type Props = {};

const Navbar = (props: Props) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const handleMenuClick = () => {
    dispatch(toggleMobileSidebar());
  };

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  return (
    <nav className="w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-6 py-3 border-b border-slate-100 shadow-sm font-manrope antialiased tracking-tight">
      <div className="flex items-center gap-8">
        <button className="md:hidden" onClick={handleMenuClick}>
          <MdOutlineMenu />
        </button>
        <span className="text-xl font-bold tracking-tighter text-slate-900">
          PulseHealth
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:block text-sm text-slate-500">
          {currentUser?.email ?? "Signed in"}
        </span>

        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full active:scale-95 duration-150 transition-colors">
          <MdNotifications className="material-symbols-outlined" />
        </button>

        <button
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-full active:scale-95 duration-150 transition-colors"
          onClick={handleSignOut}
          title="Sign out"
          type="button"
        >
          <MdLogout className="material-symbols-outlined" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
