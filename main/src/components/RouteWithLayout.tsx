import React from "react";
import Minimal from "../layout/Minimal";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectIsAuthenticated } from "auth/redux/auth";

type Props = {};

const RouteWithLayout = (props: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Minimal />;
};

export default RouteWithLayout;
