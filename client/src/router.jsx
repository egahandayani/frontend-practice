import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";
import DetailJobPage from "./pages/DetailJobPage";
import DashboardJobs from "./pages/DashboardJobs";
import CompanyList from "./pages/CompanyList";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        throw redirect("/jobs");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
      },
      {
        path: "jobs/:id",
        element: <DetailJobPage />,
      },
      {
        path: "jobs",
        element: <DashboardJobs />,
        loader: () => {
          const access_token = localStorage.getItem("access_token");
          if (access_token) {
            return null;
          }
          throw redirect("/login");
        },
      },
      {
        path: "companies",
        element: <CompanyList />,
        loader: () => {
          const access_token = localStorage.getItem("access_token");
          if (access_token) {
            return null;
          }
          throw redirect("/login");
        },
      },
    ],
  },
]);

export default router;
