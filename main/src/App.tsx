import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { initializeAuth } from "auth/redux/auth";
import { store } from "./redux/store";
import AppRoutes from "./Routes";
import { NotificationToast } from "./components";
import { storeRegistry } from "./redux/storeRegistry";

import responsiveUIReducer from "./redux/slices/responsiveUI";
storeRegistry.registerModule("responsiveUI", responsiveUIReducer);

const App = () => {
  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
        <NotificationToast />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
