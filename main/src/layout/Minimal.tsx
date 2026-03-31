import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary, Loader } from "../components";

type Props = {
  children?: React.ReactNode;
};

const Minimal = (props: Props) => {
  const { pathname } = useLocation();
  const pageName = pathname.split("/")[1] || "This page";

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <ErrorBoundary
        key={pathname}
        fallback={
          <div className="rounded-lg border border-error bg-error/10 p-4 text-error">
            {pageName} is unavailable right now
          </div>
        }
      >
        <Suspense fallback={<Loader fullScreen message={`Loading ${pageName}...`} />}>
          {props.children ? props.children : <Outlet />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Minimal;
