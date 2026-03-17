import { useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';

export function CartPage({ cart, items, loading, error, onLoad, onRemove, onGoToProducts }) {
  const toast = useToast();

  useEffect(() => {
    onLoad();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await onRemove(itemId);
      toast('Producto eliminado del carrito');
    } catch {
      toast('Error al eliminar producto', 'error');
    }
  };

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4
              flex gap-4 animate-pulse">
              <div className="w-20 h-20 bg-gray-100 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-4 bg-gray-100 rounded-full w-2/3" />
                <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                <div className="h-4 bg-gray-100 rounded-full w-1/4" />
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse space-y-3">
            <div className="h-5 bg-gray-100 rounded-full w-1/2" />
            <div className="h-4 bg-gray-100 rounded-full" />
            <div className="h-4 bg-gray-100 rounded-full w-3/4" />
            <div className="h-10 bg-gray-100 rounded-xl mt-4" />
          </div>
        </div>
      </div>
    );
  }

  /* ─── Error ─── */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-700 font-semibold">Error al cargar el carrito</p>
        <button onClick={onLoad}
          className="mt-4 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
          Reintentar
        </button>
      </div>
    );
  }

  /* ─── Vacío ─── */
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-5">
          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <p className="text-gray-700 font-semibold text-lg">Tu carrito está vacío</p>
        <p className="text-sm text-gray-400 mt-1 mb-5">Agregá productos desde el catálogo</p>
        <button
          onClick={onGoToProducts}
          className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-xl
            hover:bg-gray-700 active:scale-95 transition-all"
        >
          Ver productos
        </button>
      </div>
    );
  }

  /* ─── Con items ─── */
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mi carrito</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {items.length} producto{items.length !== 1 ? 's' : ''} — Usuario #1
          </p>
        </div>
        <button
          onClick={onLoad}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900
            border border-gray-200 rounded-lg px-3 py-2 bg-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11
                 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Recargar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <CartItem key={item.id} item={item} onRemove={handleRemove} />
          ))}
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <CartSummary items={items} cart={cart} />
        </div>
      </div>
    </section>
  );
}
