import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRouteWithLayout from "./components/PrivateRouteWithLayout";
import RouteWithLayout from "./components/RouteWithLayout";
import { Loader } from "./components";

const Login = React.lazy(() => import("auth/Login"));
const Dashboard = React.lazy(() => import("dashboard/Dashboard"));
const Patients = React.lazy(() => import("patients/Patients"));
const Analytics = React.lazy(() => import("analytics/Analytics"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route path="/" element={<></>} />

        <Route element={<RouteWithLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRouteWithLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/patients" element={<Patients />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
