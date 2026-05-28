import { useState } from "react";
import FeaturedProduct from "./FeaturedProduct";

function FeaturedProducts({ productos }) {

    const [productoAleatorio] = useState(() => {
        if (!productos || productos.length === 0) return null;

        const indiceAleatorio = Math.floor(Math.random() * productos.length);
        return productos[indiceAleatorio];
    });

    if (!productoAleatorio) return null;

    return (
        <FeaturedProduct producto={productoAleatorio} />
    );
}

export default FeaturedProducts;