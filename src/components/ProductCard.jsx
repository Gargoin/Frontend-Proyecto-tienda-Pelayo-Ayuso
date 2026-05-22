function ProductCard({producto}) {

    return (
        <article className="product-card">
            <img src={producto.imagen} alt={ProcessingInstruction.nombre}/>
            <div className="product-card-content">
                <h3>{producto.nombre}</h3>
                <p>{producto.precio}</p>
                <p>{producto.descripcion}</p>
            </div>
        </article>
    )

};
export default ProductCard;