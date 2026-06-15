import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetailPage from "../pages/ProductDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductForm from "../components/ProductForm";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [{
            index: true,
            element: <Home />,
        },
        {
            path: "new",
            element: <ProductForm />
        },
        {
            path: "edit/:id",
            element: <ProductForm />
        },
        {
            path: "productos/:id",
            element: <ProductDetailPage/>
        },
        {
            path: "login",
            element: <LoginPage />
        },
        {
            path: "register",
            element: <RegisterPage />
        },
        {
            path: "*",
            element:<NotFoundPage/>
        }
    ]

    }
]);

