const baseUrl = "http://localhost:3001";

const checkResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API request failed");
  }
  return res.json();
};

export const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`);
  return checkResponse(res);
};

export const addItem = async (itemData) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });
  return checkResponse(res);
};

export const deleteItem = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
  return checkResponse(res);
};
