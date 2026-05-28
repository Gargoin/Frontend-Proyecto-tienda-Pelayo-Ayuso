import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [{
            index: true,
            element: <Home />,
        },
        {
            path: "/productos",
            element: <ProductsPage />
        },
        {
            path: "productos/:id",
            element: <ProductDetailPage/>
        }
    ]

    }
]);

