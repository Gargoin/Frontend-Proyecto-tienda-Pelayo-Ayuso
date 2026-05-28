import {useNavigate} from "react-router-dom";

function FeaturedProduct({producto}) {
    const navigate = useNavigate();

    return (
        <article className="container-destacado container" onClick={() => navigate(`/productos/${producto.id}`)}>
            <img src={producto.imagen} alt={producto.nombre}/>
            <div className="container-destacado-content">
                <h3>{producto.nombre}</h3>
                <p>{producto.precio} €</p>
            </div>
        </article>
    )

};
export default FeaturedProduct;