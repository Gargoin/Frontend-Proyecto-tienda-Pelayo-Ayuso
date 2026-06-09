import ProductList from "../components/ProductList";
import ProductFilters from "../components/ProductFilters";
import useFilteredSortedProducts from "../hooks/useFilteredSortedProducts";
import { getProducts } from "../services/productService";
import { useState, useEffect } from "react";

function ProductsPage(){
    const [products, setProducts] = useState ([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas las categorías");
    const [sortBy, setSortBy] = useState("default");
    const {sortedProducts} = useFilteredSortedProducts(products, categoriaSeleccionada, sortBy);

    useEffect(() => {
        const loadProdutcs = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        loadProducts();
    }, []);

    return(
        <main>

        <section className="productos-nuevos">
            <div className="container">
                <h2>Productos</h2>
                <ProductFilters categoriaSeleccionada={categoriaSeleccionada} sortBy={sortBy} onCategoryChange={setCategoriaSeleccionada} onSortBy={setSortBy} products={products}/>
                <ProductList products={sortedProducts}/>
            </div>
        </section>
       
        </main>
    )

}

export default ProductsPage;