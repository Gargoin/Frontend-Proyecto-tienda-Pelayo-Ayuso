const API_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error en la petición");
    };
    
    return data;
    
};

export const getProducts = async () => {

    const response = await fetch(API_URL);

    return handleResponse(response);

};


export const getProductById = async (id) =>  {

    const response = await fetch(`${API_URL}/${id}`);

    return handleResponse(response);
};

export const createProduct = async (productData) => {

    const response = await fetch(API_URL, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(productData),
    });

    return handleResponse(response);
};


export const updateProduct = async (productData, productId) => {

    const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(productData),
    });

    return handleResponse(response);

};

export const deleteProduct = async (productId) => {

    const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
    });

    return handleResponse(response);
    
}