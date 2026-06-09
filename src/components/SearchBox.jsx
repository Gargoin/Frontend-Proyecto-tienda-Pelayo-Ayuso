import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function SearchBox({productos}) {
    const [search, setSearch] = useState("");
    const searchBoxRef = useRef(null);

     useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchBoxRef.current &&
                !searchBoxRef.current.contains(event.target)
            ) {
                setSearch("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const normalizedSearch = search.toLowerCase().trim();

    const results = productos.filter(producto => {
        const nombre = producto.nombre.toLowerCase();
        const categoria = producto.categoria.toLowerCase();

        return (nombre.includes(normalizedSearch) || categoria.includes(normalizedSearch) );
    })

    return (
        <div className="search-box" ref={searchBoxRef}>
            <input type="search" className="search-input" placeholder="Buscar..." value={search} onChange={(event) => setSearch(event.target.value)}/>

            {search.trim() != "" && (
                <div className="search-box-results">
                {results.length > 0 ? (results.map((producto) => (                
                <Link key={producto.id} onClick={() => setSearch("")}className="search-box-result" to={`/productos/${producto.id}`}>
                <strong>{producto.nombre}</strong>
                <span>{producto.categoria}</span>
                </Link>))) : (<p className="search-box-empty">No se encontaron resultados.</p>)}
            </div>
            )}
            
        </div>
    )
}

export default SearchBox;