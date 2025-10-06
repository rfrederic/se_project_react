const baseUrl = "http://localhost:3001";

export const checkResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `ERROR: ${res.status}`);
  }
  return res.json();
};

export const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`);
  return checkResponse(res);
};

export const addItem = async (itemData) => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itemData),
  });
  return checkResponse(res);
};

export const deleteItem = async (id) => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

export const addCardLike = async (id) => {
  const token = localStorage.getItem("jwt");
  console.log(token);
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

// Implement removeCardLike function
