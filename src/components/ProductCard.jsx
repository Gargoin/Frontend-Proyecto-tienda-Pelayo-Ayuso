import {useNavigate} from "react-router-dom";


function ProductCard({product}) {
    const navigate = useNavigate();

    return (
        
        <article className={`product-card ${product.categoria}`} onClick={() => navigate(`/productos/${product._id}`)}>
            <img src={product.imagen} alt={product.nombre}/>
            <div className="product-card-content">
                <h3>{product.nombre}</h3>
                <p>{product.precio} €</p>
                <p>{product.categoria}</p>
                
            </div>
        </article>
    )

};
export default ProductCard;