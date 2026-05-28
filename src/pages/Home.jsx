import ProductList from "../components/ProductList"
import{ productos } from "../data/productos";
import { useState } from "react";
import FeaturedProducts from "../components/FeaturedProducts";

function Home () {
    // const [search, setSearch] = useState("");
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

    const hasResults = productosFiltrados.length > 0;


   

    return (
    <main>
            <section className="hero">
                <div className="container">
                    <p>Bienvenido a <strong>the Project</strong>, proyecto final del <strong>Bootcamp</strong> que he realizado en <strong>Neoland</strong>, y que funciona como idea de <strong>tienda online</strong> de productos propios, además de muestra de una aplicación <strong>full stack</strong> con funcionalidades <strong>CRUD.</strong></p>
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
                <h2>Productos:</h2>
                <div className="header-section">
                <div>
                    <h3>Filtro:</h3>
                        <select className="search-input" value={categoriaSeleccionada} onChange={(event) =>setCategoriaSeleccionada(event.target.value)}>
                            {categorias.map(categoria =>(
                                <option key={categoria} value={categoria}>{categoria}</option>
                            ))}
                        </select>
                </div>
                <div>
                    <h3>Ordenar por:</h3>
                        <select className="search-input" value={sortBy} onChange={(event) => setSortBy(event.target.value) }>
                            <option value="default">Orden por defecto</option>
                            <option value="az">A-Z</option>
                            <option value="mas barato">Más barato</option>
                            <option value="mas caro">Más caro</option>
                        </select>
                </div>
                </div>
                <ProductList productos={sortedProducts}/>
            </div>
        </section>
       

    </main>
    )
}

export default Home;