import { useState } from "react";
import FeaturedProduct from "./FeaturedProduct";

function FeaturedProducts({ products }) {

    const [productoAleatorio] = useState(() => {
        if (!products || products.length === 0) return null;

        const indiceAleatorio = Math.floor(Math.random() * products.length);
        return products[indiceAleatorio];
    });

    if (!productoAleatorio) return null;

    return (
        <FeaturedProduct product={productoAleatorio} />
    );
}

export default FeaturedProducts;