import ProductList from "../components/ProductList";
import ProductFilters from "../components/ProductFilters";
import useFilteredSortedProducts from "../hooks/useFilteredSortedProducts";
import{ productos } from "../data/productos";
import { useState } from "react";

function ProductsPage(){

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas las categorías");
    const [sortBy, setSortBy] = useState("default");
    const {sortedProducts} = useFilteredSortedProducts(productos, categoriaSeleccionada, sortBy);

    return(
        <main>

        <section className="productos-nuevos">
            <div className="container">
                <h2>Productos</h2>
                <ProductFilters categoriaSeleccionada={categoriaSeleccionada} sortBy={sortBy} onCategoryChange={setCategoriaSeleccionada} onSortBy={setSortBy}/>
                <ProductList productos={sortedProducts}/>
            </div>
        </section>
       
        </main>
    )

}

export default ProductsPage;