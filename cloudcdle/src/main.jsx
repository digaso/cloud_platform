import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import VMConfig from "./VMConfig";
import RegistrationPage from "./RegistrationPage"
import AccountPage from "./AccountPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegistrationPage />,
  },
  {
    path: "/os-selection",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/vm-config",
    element: <VMConfig />,
  },
  
  {
    path: "/my-account",
    element: <AccountPage />,  
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
