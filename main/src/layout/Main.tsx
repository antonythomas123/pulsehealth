import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary, Loader } from "../components";

type Props = {
  children?: React.ReactNode;
};

const Main = (props: Props) => {
  const { pathname } = useLocation();
  const pageName = pathname.split("/")[1] || "This page";

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4 bg-surface font-body text-on-surface antialiased">
          <ErrorBoundary
            key={pathname}
            fallback={
              <div className="rounded-lg border border-error bg-error/10 p-4 text-error">
                {pageName} is unavailable right now
              </div>
            }
          >
            <Suspense fallback={<Loader fullScreen />}>
              {props.children ? props.children : <Outlet />}
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Main;
