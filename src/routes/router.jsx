import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetailPage from "../pages/ProductDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductForm from "../components/ProductForm";
import adminLoader from "../loaders/adminLoader";


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
            loader: adminLoader,
            element: <ProductForm />
        },
        {
            path: "edit/:id",
            loader: adminLoader,
            element: <ProductForm />
        },
        {
            path: "productos/:id",
            element: <ProductDetailPage/>
        },
        {
            path: "*",
            element:<NotFoundPage/>
        }
    ]

    },

    {
        path: "/auth",
        element: <MainLayout />,
        children: [
        {
            path: "login",
            element: <LoginPage />
        },
        {
            path: "register",
            element: <RegisterPage />
        }
    ]

    }
]);

