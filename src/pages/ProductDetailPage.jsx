import {useParams, Link} from "react-router-dom";
import {productos} from "../data/productos";  

function ProductDetailPage () {
    const {id} = useParams();
    const producto = productos.find((p) => p.id == id);

    if (!producto){
        return(
            <main>
                <section className="detalle-producto">
                    <div className="container-detalle">
                        <p>Ese producto no existe</p>
                        <Link className="button" to="/">Volver</Link>
                    </div>
                </section> 
            </main>
        )
    }

    return (
    <main>
        <section className="detalle-producto">
            <div className="container-detalle container">
                <img src={producto.imagen} alt={producto.nombre}/>
                <div className="detalle-producto-content">
                    <h3>{producto.nombre}</h3>
                    <p>{producto.precio} €</p>
                    <p>{producto.descripcion}</p>
                    {producto.stock < 3 && <p>Solo hay {producto.stock} en stock!</p>}
                    <Link className="button-crear">Editar</Link>
                    
                </div>
            </div>
        </section> 
        </main>
    );
 }

export default ProductDetailPage;