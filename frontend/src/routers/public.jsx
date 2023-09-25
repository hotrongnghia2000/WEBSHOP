import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/Main";
import ChangePassword from "../pages/public/ChangePassword";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import NotFound from "../pages/public/NotFound";
import Register from "../pages/public/Register";

export let publicRouter = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" replace={true} /> },
      { path: "/home", element: <Home /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/change-password", element: <ChangePassword /> },
  {
    path: "*",
    element: <NotFound />,
  },
];
