import { useState } from 'react';
import { Header } from './components/Header';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { ToastProvider } from './hooks/useToast';
import { useCart } from './hooks/useCart';

function AppContent() {
  const [activeTab, setActiveTab] = useState('productos');
  const { cart, items, loading, error, itemCount, fetchCart, addItem, removeItem } = useCart();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddToCart = async (productId, price) => {
    await addItem(productId, price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={itemCount}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'productos' && (
          <ProductsPage onAddToCart={handleAddToCart} />
        )}

        {activeTab === 'carrito' && (
          <CartPage
            cart={cart}
            items={items}
            loading={loading}
            error={error}
            onLoad={fetchCart}
            onRemove={removeItem}
            onGoToProducts={() => setActiveTab('productos')}
          />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
