import "dotenv/config";

import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  const url = process.env.APP_API_URL || "http://localhost:3000/api";
  res.send("Servidor en línea: " + url + " " + process.env.PORT);
});

app.get("/api/status", (req, res) => {
  res.json({
    estado: "online",
    mensaje: "Todo funciona correctamente",
  });
});

import productoRoutes from "./src/routes/producto.routes.js";
import cartRoutes from "./src/routes/carrito.routes.js";

app.use("/api", productoRoutes);
app.use("/api", cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
