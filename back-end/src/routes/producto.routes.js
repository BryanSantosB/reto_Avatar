import express from "express";
import { listarProductos, obtenerProducto } from "../controllers/producto.controller.js";

const router = express.Router();

router.get("/productos", listarProductos);
router.get("/productos/:id", obtenerProducto);

export default router;