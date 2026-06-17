/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewAnalysis from "./pages/NewAnalysis.jsx";
import MyReports from "./pages/MyReports.jsx";
import Profile from "./pages/Profile.jsx";

const Report = lazy(() => import("./pages/Report.jsx"));

const LazyReport = () => (
  <Suspense fallback={<main className="loading-screen"><div className="spinner" /><h1>Loading report...</h1></main>}>
    <Report />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Protected><Dashboard /></Protected>,
  },
  {
    path: "/analyze",
    element: <Protected><NewAnalysis /></Protected>,
  },
  {
    path: "/reports",
    element: <Protected><MyReports /></Protected>,
  },
  {
    path: "/profile",
    element: <Protected><Profile /></Protected>,
  },
  {
    path: "/report/:interviewId",
    element: <Protected><LazyReport /></Protected>,
  },
  {
    path: "/interview/:interviewId",
    element: <Protected><LazyReport /></Protected>,
  },
]);
