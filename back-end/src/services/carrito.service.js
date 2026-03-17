import prisma from "../config/db.js";
import { getProducto } from "./producto.service.js";

export const addToCart = async (userId, productId) => {
  const producto = await getProducto(productId);

  let cart = await prisma.order.findFirst({
    where: { usuarioId: userId },
  });

  if (!cart) {
    cart = await prisma.order.create({
      data: { usuarioId: userId },
    });
  }

  await prisma.orderItem.create({
    data: {
      carritoId: cart.id,
      productoId: productId,
      sku: `SKU-${productId}`,
      precio: producto.precio_oferta,
      imagen: producto.imagen,
      nombre: producto.nombre_producto,
    },
  });

  const items = await prisma.orderItem.findMany({
    where: { carritoId: cart.id },
  });

  const total = items.reduce((sum, item) => sum + item.precio, 0);

  await prisma.order.update({
    where: { id: cart.id },
    data: { totalCompra: total },
  });

  return {
    cartId: cart.id,
    total,
  };
};

export const getCartByUser = async (userId) => {
  const cart = await prisma.order.findFirst({
    where: {
      usuarioId: Number(userId),
    },
    include: {
      items: true,
    },
  });

  if (!cart) {
    return null;
  }

  return {
    cartId: cart.id,
    userId: cart.usuarioId,
    total: cart.totalCompra,
    items: cart.items,
  };
};

export const removeCartItem = async (itemId) => {
  const item = await prisma.orderItem.findUnique({
    where: {
      id: Number(itemId),
    },
  });

  if (!item) {
    throw new Error("Item no encontrado");
  }

  const cartId = item.carritoId;

  await prisma.orderItem.delete({
    where: {
      id: Number(itemId),
    },
  });

  const items = await prisma.orderItem.findMany({
    where: {
      carritoId: cartId,
    },
  });

  const total = items.reduce((sum, item) => sum + item.precio, 0);

  await prisma.order.update({
    where: {
      id: cartId,
    },
    data: {
      totalCompra: total,
    },
  });

  return {
    cartId,
    total,
  };
};
