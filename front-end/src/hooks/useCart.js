import { useState, useCallback } from 'react';
import { cartService } from '../services/api';

const USER_ID = 1;

export function useCart() {
  const [cart, setCart] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartService.getByUser(USER_ID);
      if (!data) {
        setCart(null);
        setItems([]);
        return;
      }
      // Soporte flexible de respuesta del backend
      const cartData = data.cart ?? data;
      setCart(cartData);
      setItems(cartData.items ?? data.items ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async (productId, price) => {
    await cartService.addItem({ userId: USER_ID, productId, price });
    // Actualizamos el carrito en segundo plano para reflejar el badge
    fetchCart();
  }, [fetchCart]);

  const removeItem = useCallback(async (itemId) => {
    await cartService.removeItem(itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    setCart((prev) => {
      if (!prev) return prev;
      const newTotal = (prev.totalCompra ?? 0) - (items.find(i => i.id === itemId)?.precio ?? 0);
      return { ...prev, totalCompra: Math.max(0, newTotal) };
    });
  }, [items]);

  return {
    cart,
    items,
    loading,
    error,
    itemCount: items.length,
    fetchCart,
    addItem,
    removeItem,
  };
}
