function FeaturedProduct({producto}) {

    return (
        <article className="product-card">
            <img src={producto.imagen} alt={ProcessingInstruction.nombre}/>
            <div className="product-card-content">
                <h3>{producto.nombre}</h3>
                <p>{producto.precio} €</p>
                <p>{producto.descripcion}</p>
                {producto.stock < 3 && <p>Solo hay {producto.stock} en stock!</p>}
            </div>
        </article>
    )

};
export default FeaturedProduct;