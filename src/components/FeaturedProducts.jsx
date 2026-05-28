import FeaturedProduct from "./FeaturedProduct";

function FeaturedProducts({ productos }) {

    if (!productos || productos.length === 0) return null;

    const indiceAleatorio = Math.floor(Math.random() * productos.length);
    const productoAleatorio = productos[indiceAleatorio];

    return (
        <FeaturedProduct producto={productoAleatorio} />
    );
}

export default FeaturedProducts;