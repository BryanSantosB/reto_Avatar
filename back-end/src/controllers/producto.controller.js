import { obtenerProductos, getProducto } from "../services/producto.service.js";

export const listarProductos = async (req, res) => {
  try {
    const products = await obtenerProductos();

    res.json({
      total: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo productos",
      error: error.message,
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const product = await getProducto(req.params.id);

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo producto",
      error: error.message,
    });
  }
};


