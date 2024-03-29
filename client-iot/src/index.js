import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import DataSensor from "./components/data-sensor/DataSensor";
import Profile from "./components/profile/Profile";
import ActionHistory from "./components/action-history/ActionHistory";
import ChartAuto from "./components/ChartAuto";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="data-sensor" element={<DataSensor />} />
          <Route path="action-history" element={<ActionHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chart" element={<ChartAuto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
