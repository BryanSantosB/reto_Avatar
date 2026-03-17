import { useState } from 'react';

function fmt(n) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    maximumFractionDigits: 2,
  }).format(n);
}

export function ProductCard({ product, onAddToCart }) {
  const [status, setStatus] = useState('idle'); // idle | loading | success

  // Precio original = precio oferta / (1 - descuento/100)
  const originalPrice = product.precio_oferta / (1 - product.porcentaje_descuento / 100);
  const savings = originalPrice - product.precio_oferta;

  const handleAdd = async () => {
    if (status !== 'idle') return;
    setStatus('loading');
    try {
      await onAddToCart(product.id, product.precio_oferta);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('idle');
    }
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100
      hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">

      {/* Imagen */}
      <div className="relative bg-gray-50 h-52 flex items-center justify-center overflow-hidden">
        <img
          src={product.imagen}
          alt={product.nombre_producto}
          className="h-44 w-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/200x180/f3f4f6/9ca3af?text=Sin+imagen';
          }}
        />
        <span className="absolute top-3 left-3 bg-amber-100 text-amber-800
          text-xs font-bold px-2 py-0.5 rounded-lg">
          -{Math.round(product.porcentaje_descuento)}%
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
          {product.marca || 'Sin marca'}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-3 line-clamp-2 flex-1">
          {product.nombre_producto}
        </h3>

        {/* Precios */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">{fmt(product.precio_oferta)}</span>
            <span className="text-xs text-gray-400 line-through">{fmt(originalPrice)}</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">
            Ahorrás {fmt(savings)}
          </p>
        </div>

        {/* Botón */}
        <button
          onClick={handleAdd}
          disabled={status !== 'idle'}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center
            justify-center gap-2 transition-all duration-200
            ${status === 'success'
              ? 'bg-emerald-700 text-white'
              : status === 'loading'
              ? 'bg-gray-700 text-white cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-700 active:scale-95'
            }`}
        >
          {status === 'loading' && (
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581
                   m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          {status === 'success' && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {status === 'idle' && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )}
          {status === 'loading' ? 'Agregando…' : status === 'success' ? '¡Listo!' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}
