import{ productos } from "../data/productos";
import { useState } from "react";

import FeaturedProducts from "../components/FeaturedProducts";
import ProductList from "../components/ProductList"
import ProductFilters from "../components/ProductFilters";
import useFilteredSortedProducts from "../hooks/useFilteredSortedProducts";

function Home () {

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas las categorías");
    const [sortBy, setSortBy] = useState("default");
    
    const {sortedProducts} = useFilteredSortedProducts(productos, categoriaSeleccionada, sortBy);

    return (
    <main>
            <section className="hero">
                <div className="container">
                    <p>Bienvenido a <strong>the Project</strong>, proyecto final del <strong>Bootcamp</strong> que he realizado en <strong>Neoland</strong>, y que funciona como idea de <strong>tienda online</strong> de productos propios, además de muestra de una aplicación <strong>full stack</strong> con funcionalidades <strong>CRUD</strong>, usando <strong>React, Vite, CSS</strong> y <strong>JavaScript.</strong></p>
                </div>
            </section>

            <section className="producto-destacado">
            <div className="container">
                <h2>Producto destacado:</h2>
                <FeaturedProducts productos={productos}/>
            </div>
        </section>

        <section className="productos">
            <div className="container">
                <h2>Catálogo de Productos:</h2>
                <ProductFilters categoriaSeleccionada={categoriaSeleccionada} sortBy={sortBy} onCategoryChange={setCategoriaSeleccionada} onSortBy={setSortBy}/>
                <ProductList productos={sortedProducts}/>
            </div>
        </section>
       

    </main>
    )
}

export default Home;