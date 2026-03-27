import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import AppRoutes from "./Routes";
import { StoreRegistry } from "./redux/storeRegistry";
import responsiveUIReducer from "./redux/slices/responsiveUI";

const storeRegistry = new StoreRegistry();
storeRegistry.registerModule("responsiveUI", responsiveUIReducer);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
