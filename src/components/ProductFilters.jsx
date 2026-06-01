
import{ productos } from "../data/productos";
import { useState } from "react";

import SearchBox from "../components/searchBox";

function ProductFilters ({categoriaSeleccionada, sortBy, onCategoryChange, onSortBy}) {

    const categorias = ["Todas las categorías", ...new Set (productos.map((producto) => producto.categoria))];

    return (
            <div className="header-section">
                <SearchBox productos={productos}/>

                <select className="search-input" value={categoriaSeleccionada} onChange={(event) => onCategoryChange(event.target.value)}>
                    {categorias.map(categoria =>(
                        <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                </select>

                <select className="search-input" value={sortBy} onChange={(event) => onSortBy(event.target.value) }>
                    <option value="default">Orden por defecto</option>
                    <option value="az">A-Z</option>
                    <option value="mas barato">Más barato</option>
                    <option value="mas caro">Más caro</option>
                </select>
            </div>
    )
}

export default ProductFilters;