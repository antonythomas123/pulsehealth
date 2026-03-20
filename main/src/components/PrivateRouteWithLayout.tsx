import React from "react";
import Main from "../layout/Main";
import { Outlet } from "react-router-dom";

type Props = {};

const PrivateRouteWithLayout = (props: Props) => {
  return <Main />;
};

export default PrivateRouteWithLayout;
