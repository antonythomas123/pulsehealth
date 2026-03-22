import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRouteWithLayout from "./components/PrivateRouteWithLayout";

type Props = {};

const Dashboard = React.lazy(() => import("dashboard/Dashboard"));

const AppRoutes = (props: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<></>} />

        <Route element={<PrivateRouteWithLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<>Analytics</>} />
          <Route path="/patients" element={<>Patients</>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
