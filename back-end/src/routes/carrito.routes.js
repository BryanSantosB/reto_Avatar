import express from "express";
import { addProduct, getCart, deleteItem} from "../controllers/carrito.controller.js";

const router = express.Router();

router.post("/cart/add", addProduct);
router.get("/cart/:userId", getCart);
router.delete("/cart/item/:id", deleteItem);

export default router;
