import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import FeaturedProduct from "./FeaturedProduct";

function FeaturedProducts() {

    const [productoAleatorio, setProductoAleatorio] = useState(null);

    useEffect(() => {

        const loadProducts = async () => {
            try {
                const data = await getProducts(
                    1,
                    20,
                    "createdAt",
                    "desc",
                    "Todas las categorías"
                );

                if (data.length) {
                    const randomIndex = Math.floor(
                        Math.random() * data.length
                    );

                    setProductoAleatorio(data[randomIndex]);
                }

            } catch(error) {
                setError(true);
            }
        };

        loadProducts();

    }, []);


    if (!productoAleatorio) return null;

    return (
        <FeaturedProduct product={productoAleatorio} />
    );
}

export default FeaturedProducts;