import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { registerNotificationServiceWorker } from "./notifications";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

void registerNotificationServiceWorker();

root.render(<App />);
