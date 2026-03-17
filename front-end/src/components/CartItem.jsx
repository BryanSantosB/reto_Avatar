import { useState } from "react";

function fmt(n) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  }).format(n);
}

export function CartItem({ item, onRemove }) {
  const [removing, setRemoving] = useState(false);
  const [visible, setVisible] = useState(true);

  const price = item.precio ?? 0;
  const productId = item.productoId ?? "?";
  const productImageUrl = item.imagen ?? null;
  const productName = item.nombre ?? productId;

  const handleRemove = async () => {
    setRemoving(true);
    try {
      setVisible(false);
      // Pequeño delay para que la animación de salida se vea
      await new Promise((r) => setTimeout(r, 220));
      await onRemove(item.id);
    } catch {
      setVisible(true);
      setRemoving(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-4 flex gap-4
        transition-all duration-200
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
    >
      {/* Avatar o Imagen del producto */}
      <div
        className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center 
                shrink-0 border border-gray-200 overflow-hidden shadow-inner"
      >
        {productImageUrl ? (
          <img
            src={productImageUrl}
            alt={productName || "Producto"}
            className="w-full h-full object-cover object-center transition-opacity duration-300"
            loading="lazy"
            onError={(e) => {
              // Fallback si la imagen falla: añade un fondo y oculta la img rota
              e.target.style.display = "none";
              e.target.parentNode.classList.add("bg-gray-200");
            }}
          />
        ) : (
          // Fallback si no hay URL de imagen (puedes poner un icono aquí)
          <span className="text-xs text-gray-400 font-mono">No Img</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm">{productName}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          SKU: <span className="font-mono">{item.sku ?? "—"}</span>
        </p>
        <p className="text-base font-bold text-gray-900 mt-1.5">{fmt(price)}</p>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={handleRemove}
        disabled={removing}
        aria-label="Eliminar producto"
        className="shrink-0 w-9 h-9 rounded-xl bg-red-50 text-red-500
          hover:bg-red-100 transition-colors flex items-center justify-center self-start
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {removing ? (
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581
                 m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7
                 m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
