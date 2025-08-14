const baseUrl = "http://localhost:3001";

export const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`);
  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  return res.json();
};

export const addItem = async (itemData) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });

  if (!res.ok) {
    throw new Error("Failed to add item");
  }
  return res.json();
};

export const deleteItem = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete item");
  }
  return res.json();
};
