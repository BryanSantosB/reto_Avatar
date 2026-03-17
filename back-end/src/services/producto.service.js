import api from "../utils/api.js";

export const obtenerProductos = async () => {
  const { data } = await api.get("/products");

  const products = data.products.map((product) => {
    const originalPrice =
      product.price / (1 - product.discountPercentage / 100);

    return {
      id: product.id,
      imagen: product.thumbnail,
      marca: product.brand,
      nombre_producto: product.title,
      precio_oferta: product.price,
      porcentaje_descuento: product.discountPercentage,
      precio_total: Number(originalPrice.toFixed(2)),
    };
  });

  return products;
};

export const getProducto = async (id) => {
  const { data: product } = await api.get(`/products/${id}`);

  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return {
    id: product.id,
    imagen: product.thumbnail,
    marca: product.brand,
    nombre_producto: product.title,
    precio_oferta: product.price,
    porcentaje_descuento: product.discountPercentage,
    precio_total: Number(originalPrice.toFixed(2)),
  };
};
