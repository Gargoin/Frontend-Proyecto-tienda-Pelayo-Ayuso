import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function SearchBox({products}) {
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

    const results = products.filter(product => {
        const nombre = product.nombre.toLowerCase();
        const categoria = product.categoria.toLowerCase();

        return (nombre.includes(normalizedSearch) || categoria.includes(normalizedSearch) );
    })

    return (
        <div className="search-box" ref={searchBoxRef}>
            <input type="search" className="search-input" placeholder="Buscar..." value={search} onChange={(event) => setSearch(event.target.value)}/>

            {search.trim() != "" && (
                <div className="search-box-results">
                {results.length > 0 ? (results.map((product) => (                
                <Link key={product._id} onClick={() => setSearch("")}className="search-box-result" to={`/productos/${product._id}`}>
                <strong>{product.nombre}</strong>
                <span>{product.categoria}</span>
                </Link>))) : (<p className="search-box-empty">No se encontaron resultados.</p>)}
            </div>
            )}
            
        </div>
    )
}

export default SearchBox;