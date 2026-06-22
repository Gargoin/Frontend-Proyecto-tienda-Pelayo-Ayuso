import { useState, useEffect } from "react";

import { getProducts } from "../services/productService";

import FeaturedProducts from "../components/FeaturedProducts";
import ProductList from "../components/ProductList";
import ProductFilters from "../components/ProductFilters";


function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState( "Todas las categorías");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
  const loadAllProducts = async () => {
    try {
      const data = await getProducts(
        "createdAt",
        "desc",
        "Todas las categorías"
      );

      setAllProducts(data);

    } catch(error) {
      console.log(error);
    }
  };

  loadAllProducts();

  }, []);


  useEffect(() => {

  const loadProducts = async () => {

    try {

      const field = sortBy === "mas barato" || sortBy === "mas caro" ? "precio" : sortBy === "default" ? "createdAt" : "nombre";
      const order = sortBy === "az" || sortBy === "mas barato" || sortBy === "default" ? "asc" : "desc";
      
      const data = await getProducts( page, 6, field, order, categoriaSeleccionada );


      if(page === 1){

      setProducts(data);

      } else {

        setProducts(prev => [...prev, ...data]);

      } 
    
      if(data.length < 6){
        setHasMore(false);
      }

    } catch(error) {

      setError("No se pudieron obtener los productos");

    } finally {

      setLoading(false);
      setLoadingMore(false);

    }

  };


  loadProducts();

}, [sortBy, categoriaSeleccionada, page]);

useEffect(() => {

  const handleScroll = () => {

    const scrollLlegandoAlFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;

    if( scrollLlegandoAlFinal && hasMore && !loadingMore) {

      setLoadingMore(true);
      setPage(prev => prev + 1);

    }

  };

  window.addEventListener( "scroll", handleScroll);

  return () => { window.removeEventListener( "scroll", handleScroll);};


}, [hasMore, loadingMore]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);

  }, [sortBy, categoriaSeleccionada]);

  
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
        <p className="cargando">{error}</p>
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
            products={allProducts}
          />
          <ProductList products={products} />
          {loadingMore && (<p className="cargando final">Cargando más productos...</p>)}
          {!hasMore && (<p className="cargando final">Has llegado al final</p>)}
        </div>
      </section>
    </main>
  );
}

export default Home;
