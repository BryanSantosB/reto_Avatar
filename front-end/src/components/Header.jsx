export function Header({ activeTab, onTabChange, cartCount }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        flex items-center justify-between h-16">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900">ShopReto</span>
        </div>

        {/* Tabs */}
        <nav className="flex gap-1">
          {[
            { key: 'productos', label: 'Productos' },
            { key: 'carrito', label: 'Carrito' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium
                rounded-lg transition-all duration-150
                ${activeTab === tab.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              {tab.label}
              {tab.key === 'carrito' && cartCount > 0 && (
                <span className={`text-xs font-bold rounded-full w-5 h-5
                  flex items-center justify-center transition-colors
                  ${activeTab === 'carrito'
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-900 text-white'
                  }`}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="text-xs text-gray-400 font-mono hidden sm:block">
          userId: 1
        </div>
      </div>
    </header>
  );
}
