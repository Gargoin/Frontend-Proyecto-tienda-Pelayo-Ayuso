const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
};


export const getCart = async () => {
  const token = getToken();

  const response = await fetch(API_URL, {
    headers: {
      Authorization: token,
    },
  });

  return handleResponse(response);
};


export const createCartItem = async (itemData) => {
  const token = getToken();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(itemData),
  });

  return handleResponse(response);
};


export const updateCartItem = async (itemId, data) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};


export const deleteCartItem = async (itemId) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  return handleResponse(response);
};


export const clearCart = async () => {
  const token = getToken();

  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  return handleResponse(response);
};