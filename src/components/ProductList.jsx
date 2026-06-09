import ProductCard from "./ProductCard";

function ProductList ({products}) {

    return (
        <div className="lista-productos">
            {products.map((product) => (
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
    )
}

export default ProductList;