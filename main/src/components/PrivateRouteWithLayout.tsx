import React from "react";
import Main from "../layout/Main";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectIsAuthenticated } from "auth/redux/auth";

type Props = {};

const PrivateRouteWithLayout = (props: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Main />;
};

export default PrivateRouteWithLayout;
