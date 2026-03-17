const BASE_URL = 'http://localhost:3000/api';

export const productosService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/productos`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    return data.products ?? data;
  },
};

export const cartService = {
  getByUser: async (userId) => {
    const res = await fetch(`${BASE_URL}/cart/${userId}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  },

  addItem: async ({ userId, productId, price }) => {
    const res = await fetch(`${BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, price }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  },

  removeItem: async (itemId) => {
    const res = await fetch(`${BASE_URL}/cart/item/${itemId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  },
};
