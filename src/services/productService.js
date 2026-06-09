const API_URL = 'http://localhost:3000/api/products';

export const getProducts = async () => {

    const response = await fetch(API_URL);

    console.log(response);

    if (!response.ok){
        throw new Error("Error al obtener los productos");
    }

    const data = await response.json();

    return data;

};


export const getProductById = async (id) =>  {

    const response = await fetch(`${API_URL}/${id}`);

    if(!response.ok) {

        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener el producto");
    }


    const data = await response.json();

    return data;

};

export const createProduct = async (productData) => {

    const response = await fetch(API_URL, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        bosdy: JSON-stringify(productData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el producto");
    }

    return response.json();
};


export const updateProduct = async (productId, productData) => {

    const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON-stringify(productData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el producto");
    }
    
    return response.json();

};

export const deleteProduct = async (productId) => {
       const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
    });

    
}