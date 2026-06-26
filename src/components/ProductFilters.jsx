
import { useState } from "react";

import SearchBox from "../components/SearchBox";

function ProductFilters ({categoriaSeleccionada, sortBy, onCategoryChange, onSortBy, products}) {

    const categorias = ["Todas las categorías", ...new Set (products.map((product) => product.categoria))];

    return (
            <div className="header-section">
                <SearchBox products={products}/>

                <select className="search-input" value={categoriaSeleccionada} onChange={(event) => onCategoryChange(event.target.value)}>
                    {categorias.map(categoria =>(
                        <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                </select>

                <select className="search-input" value={sortBy} onChange={(event) => onSortBy(event.target.value) }>
                    <option value="default">Lo más nuevo</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                    <option value="mas barato">Más barato</option>
                    <option value="mas caro">Más caro</option>
                    
                </select>
            </div>
    )
}

export default ProductFilters;