import { useEffect, useState } from 'react';
import { AccountModal } from './components/AccountModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CollectionPage } from './components/CollectionPage';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { OurStoryPage } from './components/OurStoryPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchOverlay } from './components/SearchOverlay';
import { WishlistDrawer } from './components/WishlistDrawer';
import { FRAGRANCES } from './data/fragrances';
import {
  BottleSize,
  CartItem,
  FilterState,
  Fragrance,
  FragranceFamily,
  OrderRecord,
  PageView,
} from './types/fragrance';

const CART_STORAGE_KEY = 'noira_cart_v1';
const WISHLIST_STORAGE_KEY = 'noira_wishlist_v1';
const ORDERS_STORAGE_KEY = 'noira_orders_v1';

const DEFAULT_FILTERS: FilterState = {
  family: 'All',
  category: 'All',
  collection: 'All',
  size: 'All',
  priceRange: 'All',
  sort: 'featured',
  searchQuery: '',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [view, setView] = useState<PageView>({ name: 'home' });
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [cart, setCart] = useState<CartItem[]>(() => readStorage<CartItem[]>(CART_STORAGE_KEY, []));
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    readStorage<string[]>(WISHLIST_STORAGE_KEY, [])
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    readStorage<OrderRecord[]>(ORDERS_STORAGE_KEY, [])
  );
  const [giftWrap, setGiftWrap] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Fragrance | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota issues
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage quota issues
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota issues
    }
  }, [orders]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCartOpen(false);
        setCheckoutOpen(false);
        setSearchOpen(false);
        setWishlistOpen(false);
        setAccountOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (nextView: PageView) => {
    if (nextView.name === 'collection') {
      setFilters({
        ...DEFAULT_FILTERS,
        collection: nextView.collection ?? 'All',
        category: nextView.category ?? 'All',
      });
    }
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFamilyFilter = (family: FragranceFamily) => {
    setFilters({ ...DEFAULT_FILTERS, family });
    setView({ name: 'collection' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchInCatalog = (query: string) => {
    setFilters({ ...DEFAULT_FILTERS, searchQuery: query });
    setView({ name: 'collection' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBag = (fragrance: Fragrance, size: BottleSize, quantity: number) => {
    const cartItemId = `${fragrance.id}-${size}`;
    const unitPrice = fragrance.prices[size];

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: fragrance.id,
          name: fragrance.name,
          subtitle: fragrance.subtitle,
          size,
          price: unitPrice,
          quantity,
          artwork: fragrance.artwork,
          accentHex: fragrance.accentHex,
          liquidHex: fragrance.liquidHex,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleBuyNow = (fragrance: Fragrance, size: BottleSize, quantity: number) => {
    const cartItemId = `${fragrance.id}-${size}`;
    const unitPrice = fragrance.prices[size];

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: fragrance.id,
          name: fragrance.name,
          subtitle: fragrance.subtitle,
          size,
          price: unitPrice,
          quantity,
          artwork: fragrance.artwork,
          accentHex: fragrance.accentHex,
          liquidHex: fragrance.liquidHex,
        },
      ];
    });
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleOrderConfirmed = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setGiftWrap(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const selectedProduct =
    view.name === 'product'
      ? FRAGRANCES.find((f) => f.id === view.productId) ?? FRAGRANCES[0]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#101010]">
      <Navbar
        currentView={view}
        onNavigate={navigate}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
      />

      <div className="flex-1">
        {view.name === 'home' && (
          <HomePage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={setQuickViewProduct}
            onAddToBag={handleAddToBag}
            onNavigate={navigate}
            onSelectFamilyFilter={handleSelectFamilyFilter}
          />
        )}

        {view.name === 'collection' && (
          <CollectionPage
            filters={filters}
            giftsOnly={Boolean(view.giftsOnly)}
            onUpdateFilters={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={setQuickViewProduct}
            onAddToBag={handleAddToBag}
            onSelectProduct={(productId) => navigate({ name: 'product', productId })}
          />
        )}

        {view.name === 'product' && selectedProduct && (
          <ProductDetailPage
            key={selectedProduct.id}
            fragrance={selectedProduct}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onAddToBag={handleAddToBag}
            onBuyNow={handleBuyNow}
            onSelectProduct={(productId) => navigate({ name: 'product', productId })}
            onBackToCollection={() => navigate({ name: 'collection' })}
            onQuickView={setQuickViewProduct}
            wishlistIds={wishlistIds}
          />
        )}

        {view.name === 'story' && <OurStoryPage onNavigate={navigate} />}
      </div>

      <Footer onNavigate={navigate} onOpenAccount={() => setAccountOpen(true)} />

      {/* Overlays & Drawers */}
      <CartDrawer
        open={cartOpen}
        items={cart}
        giftWrap={giftWrap}
        onToggleGiftWrap={() => setGiftWrap((prev) => !prev)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClose={() => setCartOpen(false)}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onExploreFragrances={() => navigate({ name: 'collection' })}
      />

      <CheckoutModal
        open={checkoutOpen}
        items={cart}
        giftWrap={giftWrap}
        onClose={() => setCheckoutOpen(false)}
        onOrderConfirmed={handleOrderConfirmed}
      />

      <QuickViewModal
        fragrance={quickViewProduct}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToBag={handleAddToBag}
        onViewDetails={(productId) => navigate({ name: 'product', productId })}
        onClose={() => setQuickViewProduct(null)}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(productId) => navigate({ name: 'product', productId })}
        onSearchInCatalog={handleSearchInCatalog}
      />

      <WishlistDrawer
        open={wishlistOpen}
        wishlistIds={wishlistIds}
        onClose={() => setWishlistOpen(false)}
        onRemoveWishlist={handleToggleWishlist}
        onAddToBag={handleAddToBag}
        onSelectProduct={(productId) => navigate({ name: 'product', productId })}
      />

      <AccountModal
        open={accountOpen}
        orders={orders}
        wishlistCount={wishlistIds.length}
        onClose={() => setAccountOpen(false)}
      />
    </div>
  );
}
