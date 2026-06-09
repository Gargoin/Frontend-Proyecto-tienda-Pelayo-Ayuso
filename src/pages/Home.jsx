import { useState, useEffect } from "react";

import { getProducts } from "../services/productService";

import FeaturedProducts from "../components/FeaturedProducts";
import ProductList from "../components/ProductList";
import ProductFilters from "../components/ProductFilters";
import useFilteredSortedProducts from "../hooks/useFilteredSortedProducts";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    "Todas las categorías",
  );
  const [sortBy, setSortBy] = useState("default");

  const { sortedProducts } = useFilteredSortedProducts(
    products,
    categoriaSeleccionada,
    sortBy,
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        console.log(data);
        setProducts(data);

      } catch (error) {
        setError("No se pudieron obtener los productos");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  
  if (loading) {
    return (
      <div className="container">
        <p className="cargando">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main>
      <section className="hero">
        <div className="container">
          <p>
            Bienvenido a <strong>the Project</strong>, proyecto final del{" "}
            <strong>Bootcamp</strong> que he realizado en{" "}
            <strong>Neoland</strong>, y que funciona como idea de{" "}
            <strong>tienda online</strong> de productos propios, además de
            muestra de una aplicación <strong>full stack</strong> con
            funcionalidades <strong>CRUD</strong>, usando{" "}
            <strong>React, Vite, CSS</strong> y <strong>JavaScript.</strong>
          </p>
        </div>
      </section>

      <section className="producto-destacado">
        <div className="container">
          <h2>Producto destacado:</h2>
          <FeaturedProducts products={products} />
        </div>
      </section>

      <section className="productos">
        <div className="container">
          <h2>Catálogo de Productos:</h2>
          <ProductFilters
            categoriaSeleccionada={categoriaSeleccionada}
            sortBy={sortBy}
            onCategoryChange={setCategoriaSeleccionada}
            onSortBy={setSortBy}
          />
          <ProductList products={sortedProducts} />
        </div>
      </section>
    </main>
  );
}

export default Home;
