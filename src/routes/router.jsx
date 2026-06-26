import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetailPage from "../pages/ProductDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductFormPage from "../pages/ProductFormPage";
import OrderPage from "../pages/OrderPage";
import CartPage from "../pages/CartPage";
import adminLoader from "../loaders/adminLoader";
import userLoader from "../loaders/userLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "new",
        loader: adminLoader,
        element: <ProductFormPage />,
      },
      {
        path: "edit/:id",
        loader: adminLoader,
        element: <ProductFormPage />,
      },
      {
        path: "productos/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "orden",
        loader: userLoader,
        element: <OrderPage />
      },
      {
        path: "cart",
        loader: userLoader,
        element: <CartPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },

  {
    path: "/auth",
    element: <MainLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);