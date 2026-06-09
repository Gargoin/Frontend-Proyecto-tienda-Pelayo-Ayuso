import {useNavigate} from "react-router-dom";

function FeaturedProduct({product}) {
    const navigate = useNavigate();

    return (
        <article className="container-destacado container" onClick={() => navigate(`/productos/${product._id}`)}>
            <img src={product.imagen} alt={product.nombre}/>
            <div className="container-destacado-content">
                <h3>{product.nombre}</h3>
                <p>{product.precio} €</p>
            </div>
        </article>
    )

};
export default FeaturedProduct;