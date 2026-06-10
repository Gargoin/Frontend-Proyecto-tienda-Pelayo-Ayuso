import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetailPage from "../pages/ProductDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductForm from "../components/ProductForm";
import Login from "../components/Login";

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
            element: <Login />
        },
        {
            path: "*",
            element:<NotFoundPage/>
        }
    ]

    }
]);

