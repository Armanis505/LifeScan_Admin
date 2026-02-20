import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardRoutes from "./routing/DashboardRoutes.jsx";
import Dashboard from "./components/layout/Dashboard.jsx";
import Homepage from "./pages/dashboard/Homepage.jsx";
import RegisterStudentPage from "./pages/dashboard/RegisterStudent.jsx";
import Login from "./features/auth/Login.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/",
    element: <DashboardRoutes />,
    children: [
      {
        path: "/homepage",
        element: <Dashboard children={<Homepage />} />,
      },
      {
        path: "/register-student",
        element: <Dashboard children={<RegisterStudentPage />} />,
      },
      {
        path: "/history",
        element: <Dashboard children={<Homepage />} />,
      },
      {
        path: "/settings",
        element: <Dashboard children={<Homepage />} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
