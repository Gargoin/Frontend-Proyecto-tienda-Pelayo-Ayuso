import {useParams, Link} from "react-router-dom";
import {productos} from "../data/productos";  

function ProductDetailPage () {
    const {id} = useParams();
    const producto = productos.find((p) => p.id == id);

    if (!producto){
        return(
            <main>
                <section className="detalle-producto">
                    <div className="container-detalle container">
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
                <img src={producto.imagenDetalle} alt={producto.nombre}/>
                <div className="detalle-producto-content">
                    <h1>{producto.nombre}</h1>
                    <p>{producto.precio} €</p>
                    <p>{producto.descripcion}</p>
                    {producto.stock < 3 && <p>Solo hay {producto.stock} en stock!</p>}
                    <div className="botonera">
                        <Link className="button-crear">Editar</Link>
                        <Link className="button" to="/">Volver</Link>
                    </div>
                    
                </div>
            </div>
        </section> 
        </main>
    );
 }

export default ProductDetailPage;