import { useProducts } from '../hooks/useProducts';
import { useToast } from '../hooks/useToast';
import { ProductCard } from '../components/ProductCard';
import { ProductSkeleton } from '../components/ProductSkeleton';

export function ProductsPage({ onAddToCart }) {
  const { products, loading, error, refetch } = useProducts();
  const toast = useToast();

  const handleAddToCart = async (productId, price) => {
    await onAddToCart(productId, price);
    toast('Producto agregado al carrito ✓');
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-700 font-semibold">No se pudieron cargar los productos</p>
        <p className="text-sm text-gray-400 mt-1">
          Verificá que el backend esté en{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">localhost:3000</code>
        </p>
        <button
          onClick={refetch}
          className="mt-5 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-xl
            hover:bg-gray-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <section>
      {/* Header de sección */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catálogo</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {loading ? 'Cargando productos…' : `${products.length} productos disponibles`}
          </p>
        </div>
        <button
          onClick={refetch}
          disabled={loading}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900
            border border-gray-200 rounded-lg px-3 py-2 bg-white transition-colors
            disabled:opacity-50"
        >
          <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11
                 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Recargar
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading
          ? Array(8).fill(0).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={handleAddToCart}
              />
            ))
        }
      </div>
    </section>
  );
}
