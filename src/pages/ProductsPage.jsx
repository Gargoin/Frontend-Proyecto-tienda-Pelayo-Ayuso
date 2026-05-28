import ProductList from "../components/ProductList"
import{ productos } from "../data/productos";
import { useState } from "react";

function ProductsPage(){
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas las categorías");

    const categorias = ["Todas las categorías", ...new Set (productos.map((producto) => producto.categoria))];

    const productosFiltrados = productos.filter((producto) => categoriaSeleccionada == "Todas las categorías" || producto.categoria == categoriaSeleccionada );

    const [sortBy, setSortBy] = useState("default");

    const sortedProducts = [...productosFiltrados].sort((a,b) => {
        if(sortBy == "az") {
            if (a.nombre < b.nombre) return -1;
            if (a.nombre > b.nombre) return 1;
            return 0;
        }
        if (sortBy == "mas barato"){
            return a.precio - b.precio;
        }

        if (sortBy == "mas caro"){
            return b.precio - a.precio;
        }

    })

    const productosDestacados = productos.filter(producto => producto.destacado); 
    const hasResults = productosFiltrados.length > 0;

    return(
        <main>

        <section className="productos-nuevos">
            <div className="container">
                <h2>Productos</h2>
                <div className="header-section">
                <select className="search-input" value={categoriaSeleccionada} onChange={(event) =>setCategoriaSeleccionada(event.target.value)}>
                    {categorias.map(categoria =>(
                        <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                </select>

                <select className="search-input" value={sortBy} onChange={(event) => setSortBy(event.target.value) }>
                    <option value="default">Orden por defecto</option>
                    <option value="az">A-Z</option>
                    <option value="mas barato">Más barato</option>
                    <option value="mas caro">Más caro</option>
                </select>
                </div>
                <ProductList productos={sortedProducts}/>
            </div>
        </section>
       
        </main>
    )

}

export default ProductsPage;