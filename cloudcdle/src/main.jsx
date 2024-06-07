import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./HomePage";
import VMConfig from "./VMConfig";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/vm-config",
    element: <VMConfig />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
