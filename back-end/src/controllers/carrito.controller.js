import {
  addToCart,
  getCartByUser,
  removeCartItem,
} from "../services/carrito.service.js";

export const addProduct = async (req, res) => {
  try {
    const { userId, productId, price } = req.body;

    const result = await addToCart(userId, productId, price);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error agregando producto",
      error: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await getCartByUser(userId);

    if (!cart) {
      return res.status(404).json({
        message: "El usuario no tiene carrito",
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo carrito",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await removeCartItem(id);

    res.json({
      message: "Producto eliminado del carrito",
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error eliminando producto",
      error: error.message,
    });
  }
};
