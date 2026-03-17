function fmt(n) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    maximumFractionDigits: 2,
  }).format(n);
}

export function CartSummary({ items, cart }) {
  const subtotal = items.reduce((sum, i) => sum + (i.precio ?? i.price ?? 0), 0);
  const total = cart?.totalCompra ?? subtotal;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
      <h2 className="font-bold text-gray-900 text-base mb-5">Resumen de compra</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Productos ({items.length})</span>
          <span>{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Envío</span>
          <span className="text-emerald-600 font-medium">Gratis</span>
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between
          font-bold text-base text-gray-900">
          <span>Total</span>
          <span>{fmt(total)}</span>
        </div>
      </div>

      <button className="w-full mt-5 py-3 bg-gray-900 text-white rounded-xl
        text-sm font-semibold hover:bg-gray-700 active:scale-95
        transition-all duration-200">
        Finalizar compra
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Demo — sin procesamiento de pago
      </p>
    </div>
  );
}
