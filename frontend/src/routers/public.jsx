import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/Main";
import AdminLogin from "../pages/public/AdminLogin";
import Cart from "../pages/public/Cart";
import ChangePassword from "../pages/public/ChangePassword";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import NotFound from "../pages/public/NotFound";
import ProductDetail from "../pages/public/ProductDetail";
import Register from "../pages/public/Register";

export let publicRouter = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/products" replace={true} /> },
      { path: "/products", element: <Home /> },
      { path: "/products/:category", element: <Home /> },
      {
        path: "/:category/:productId/:productName",
        element: <ProductDetail />,
      },
      { path: "/cart", element: <Cart /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/admin-login", element: <AdminLogin /> },
  { path: "/register", element: <Register /> },
  { path: "/change-password", element: <ChangePassword /> },
  {
    path: "*",
    element: <NotFound />,
  },
];
