import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRouteWithLayout from "./components/PrivateRouteWithLayout";
import RouteWithLayout from "./components/RouteWithLayout";


const Login = React.lazy(() => import("auth/Login"));
const Dashboard = React.lazy(() => import("dashboard/Dashboard"));
const Patients = React.lazy(() => import("patients/Patients"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<></>} />

        <Route element={<RouteWithLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRouteWithLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<>Analytics</>} />
          <Route path="/patients" element={<Patients />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
