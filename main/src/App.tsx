import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";

type Props = {};

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
