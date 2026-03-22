import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};

const Main = (props: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          {props.children ? props.children : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Main;
