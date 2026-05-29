function useFilteredSortedProducts (productos, categoriaSeleccionada, sortBy) {

    const productosFiltrados = productos.filter((producto) => categoriaSeleccionada == "Todas las categorías" || producto.categoria == categoriaSeleccionada );

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

    return {productosFiltrados, sortedProducts};
    
}

export default useFilteredSortedProducts;