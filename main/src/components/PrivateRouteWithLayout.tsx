import React from "react";
import Main from "../layout/Main";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Loader } from "./";
import {
  selectAuthInitialized,
  selectIsAuthenticated,
} from "auth/redux/auth";

type Props = {};

const PrivateRouteWithLayout = (props: Props) => {
  const isAuthInitialized = useAppSelector(selectAuthInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthInitialized) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Main />;
};

export default PrivateRouteWithLayout;
