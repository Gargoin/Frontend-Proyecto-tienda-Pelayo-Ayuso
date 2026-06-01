import ProductCard from "./ProductCard";
import { productos } from "../data/productos";

function ProductCarousel () {
    return (
        <section className="product-carousel-section">
            <div className="container">
                <div className="product-carousel-header">
                    <h2>Contenido destacado</h2>
                    <span>Desliza para ver mas</span>
                </div>

                <div className="product-carousel">
                {productos.map((producto) => (
                    <div key={producto.id} className="product-carousel-item"><ProductCard producto={producto}/></div>
                ))}
                
                </div>
            </div>
        </section>
    )
}

export default ProductCarousel;