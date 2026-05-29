import {useNavigate} from "react-router-dom";


function ProductCard({producto}) {
    const navigate = useNavigate();

    return (
        
        <article className={`product-card ${producto.categoria}`} onClick={() => navigate(`/productos/${producto.id}`)}>
            <img src={producto.imagen} alt={producto.nombre}/>
            <div className="product-card-content">
                <h3>{producto.nombre}</h3>
                <p>{producto.precio} €</p>
                <p>{producto.descripcion}</p>
            </div>
        </article>
    )

};
export default ProductCard;