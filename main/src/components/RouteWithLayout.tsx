import React from "react";
import Minimal from "../layout/Minimal";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Loader } from "./";
import {
  selectAuthInitialized,
  selectIsAuthenticated,
} from "auth/redux/auth";

type Props = {};

const RouteWithLayout = (props: Props) => {
  const isAuthInitialized = useAppSelector(selectAuthInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthInitialized) {
    return <Loader fullScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Minimal />;
};

export default RouteWithLayout;
