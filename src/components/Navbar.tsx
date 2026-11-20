import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { COLLECTIONS, FRAGRANCES } from '../data/fragrances';
import { CollectionSlug, GenderCategory, PageView } from '../types/fragrance';
import { LuxuryArtwork } from './LuxuryArtwork';
import { formatCurrency } from '../utils/catalog';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenAccount,
}) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [megaMenuOpen, setMegaMenuOpen] = useState<'fragrances' | 'collections' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: PageView) => {
    setMegaMenuOpen(null);
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  const isActive = (target: string): boolean => {
    if (target === 'home') return currentView.name === 'home';
    if (target === 'story') return currentView.name === 'story';
    if (currentView.name !== 'collection') return false;
    if (target === 'fragrances')
      return !currentView.collection && !currentView.category && !currentView.giftsOnly;
    if (target === 'collections') return Boolean(currentView.collection);
    if (target === 'him') return currentView.category === 'Masculine';
    if (target === 'her') return currentView.category === 'Feminine';
    if (target === 'gifts') return Boolean(currentView.giftsOnly);
    return false;
  };

  const navLinkClass = (active: boolean) =>
    `relative py-1 text-[11px] font-medium uppercase tracking-[0.18em] whitespace-nowrap shrink-0 transition-colors duration-200 ${
      active
        ? 'text-[#C6A66A]'
        : 'text-[#F7F4EE]/90 hover:text-[#C6A66A]'
    }`;

  return (
    <div
      className="sticky top-0 z-40 w-full"
      onMouseLeave={() => setMegaMenuOpen(null)}
    >
      {/* Slim Dismissible Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-[#101010] border-b border-white/10 text-[#E9E1D5] h-8 px-4 flex items-center justify-center relative text-[11px] tracking-[0.14em] uppercase">
          <p className="truncate pr-6 text-center">
            Complimentary Express Delivery Over $200 · Two Signature Samples With Every Order
          </p>
          <button
            type="button"
            onClick={() => setShowAnnouncement(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 p-1 text-[#E9E1D5]/70 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Primary Header */}
      <header className="bg-[#101010]/95 backdrop-blur-md border-b border-white/10 text-[#F7F4EE]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 -ml-2 text-[#F7F4EE] hover:text-[#C6A66A] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavClick({ name: 'home' })}
            className="font-editorial text-2xl sm:text-[28px] tracking-[0.3em] font-normal text-[#FFFFFF] whitespace-nowrap shrink-0 hover:text-[#C6A66A] transition-colors"
          >
            NOIRA
          </button>

          {/* Zone 2: Navigation Links */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              type="button"
              onClick={() => handleNavClick({ name: 'home' })}
              onMouseEnter={() => setMegaMenuOpen(null)}
              className={navLinkClass(isActive('home'))}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick({ name: 'collection' })}
              onMouseEnter={() => setMegaMenuOpen('fragrances')}
              className={navLinkClass(isActive('fragrances'))}
            >
              Fragrances
            </button>
            <button
              type="button"
              onClick={() => handleNavClick({ name: 'collection', collection: 'signature' })}
              onMouseEnter={() => setMegaMenuOpen('collections')}
              className={navLinkClass(isActive('collections'))}
            >
              Collections
            </button>
            <button
              type="button"
              onClick={() => handleNavClick({ name: 'collection', category: 'Masculine' })}
              onMouseEnter={() => setMegaMenuOpen(null)}
              className={navLinkClass(isActive('him'))}
            >
              For Him
            </button>
            <button
              type="button"
              onClick={() => handleNavClick({ name: 'collection', category: 'Feminine' })}
              onMouseEnter={() => setMegaMenuOpen(null)}
              className={navLinkClass(isActive('her'))}
            >
              For Her
            </button>
            <button
              type="button"
              onClick={() => handleNavClick({ name: 'collection', giftsOnly: true })}
              onMouseEnter={() => setMegaMenuOpen(null)}
              className={navLinkClass(isActive('gifts'))}
            >
              Gifts
            </button>
            <button
              type="button"
              onClick={() => handleNavClick({ name: 'story' })}
              onMouseEnter={() => setMegaMenuOpen(null)}
              className={navLinkClass(isActive('story'))}
            >
              Our Story
            </button>
          </nav>

          {/* Zone 3: Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search fragrances"
              className="p-2 text-[#F7F4EE] hover:text-[#C6A66A] transition-colors"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={onOpenAccount}
              aria-label="Client account"
              className="hidden sm:inline-flex p-2 text-[#F7F4EE] hover:text-[#C6A66A] transition-colors"
            >
              <User className="w-[18px] h-[18px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Open wishlist (${wishlistCount} saved)`}
              className="relative p-2 text-[#F7F4EE] hover:text-[#C6A66A] transition-colors"
            >
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.6} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-[#C6A66A] text-[#101010] ring-2 ring-[#101010] text-[10px] font-semibold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag (${cartCount} items)`}
              className="relative p-2 text-[#F7F4EE] hover:text-[#C6A66A] transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.6} />
              <span className="text-[11px] tracking-[0.12em] uppercase tabular-nums hidden sm:inline">
                Bag ({cartCount})
              </span>
              {cartCount > 0 && (
                <span className="sm:hidden absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-[#C6A66A] text-[#101010] ring-2 ring-[#101010] text-[10px] font-semibold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Editorial Mega-Menu */}
        {megaMenuOpen && (
          <div className="hidden lg:block border-t border-white/10 bg-[#141414] text-[#F7F4EE]">
            <div className="max-w-[1440px] mx-auto px-8 py-8 grid grid-cols-12 gap-8">
              {megaMenuOpen === 'fragrances' ? (
                <>
                  <div className="col-span-3 space-y-3 border-r border-white/10 pr-6">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A66A]">
                      Explore By Category
                    </p>
                    <ul className="space-y-2.5 text-sm">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleNavClick({ name: 'collection' })}
                          className="text-[#F7F4EE]/90 hover:text-[#C6A66A] transition-colors"
                        >
                          All Fragrances
                        </button>
                      </li>
                      {(['Feminine', 'Masculine', 'Unisex'] as GenderCategory[]).map((cat) => (
                        <li key={cat}>
                          <button
                            type="button"
                            onClick={() => handleNavClick({ name: 'collection', category: cat })}
                            className="text-[#F7F4EE]/90 hover:text-[#C6A66A] transition-colors"
                          >
                            {cat} Creations
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          type="button"
                          onClick={() => handleNavClick({ name: 'collection', giftsOnly: true })}
                          className="text-[#F7F4EE]/90 hover:text-[#C6A66A] transition-colors"
                        >
                          Gift Coffrets & Discovery
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="col-span-9">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A66A] mb-4">
                      Icons of the Maison
                    </p>
                    <div className="grid grid-cols-4 gap-5">
                      {FRAGRANCES.slice(0, 4).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavClick({ name: 'product', productId: item.id })}
                          className="group text-left"
                        >
                          <div className="aspect-[4/5] overflow-hidden border border-white/10 mb-2.5">
                            <LuxuryArtwork
                              variant={item.artwork}
                              compact
                              className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <p className="font-editorial text-base tracking-[0.12em] text-white group-hover:text-[#C6A66A] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#E9E1D5]/70 tabular-nums">
                            {item.family} · From {formatCurrency(item.prices['30ml'])}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-3 space-y-3 border-r border-white/10 pr-6">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A66A]">
                      The Four Collections
                    </p>
                    <ul className="space-y-2.5 text-sm">
                      {COLLECTIONS.map((col) => (
                        <li key={col.slug}>
                          <button
                            type="button"
                            onClick={() =>
                              handleNavClick({ name: 'collection', collection: col.slug as CollectionSlug })
                            }
                            className="text-[#F7F4EE]/90 hover:text-[#C6A66A] transition-colors text-left"
                          >
                            {col.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-9 grid grid-cols-4 gap-5">
                    {COLLECTIONS.map((col) => {
                      const featured = FRAGRANCES.find((f) => f.id === col.featuredProductId)!;
                      return (
                        <button
                          key={col.slug}
                          type="button"
                          onClick={() =>
                            handleNavClick({ name: 'collection', collection: col.slug })
                          }
                          className="group text-left"
                        >
                          <div className="aspect-[4/5] overflow-hidden border border-white/10 mb-2.5">
                            <LuxuryArtwork
                              variant={featured.artwork}
                              compact
                              className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-[#C6A66A]">
                            {col.kicker}
                          </p>
                          <p className="font-editorial text-base tracking-[0.08em] text-white mt-0.5">
                            {col.title}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-[#101010] text-[#F7F4EE] h-full flex flex-col justify-between p-6 border-r border-white/10 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-editorial text-2xl tracking-[0.3em] text-white">NOIRA</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-[#F7F4EE]/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav aria-label="Mobile navigation" className="py-6 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => handleNavClick({ name: 'home' })}
                  className="text-left py-2 text-sm uppercase tracking-[0.2em] border-b border-white/5 hover:text-[#C6A66A]"
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick({ name: 'collection' })}
                  className="text-left py-2 text-sm uppercase tracking-[0.2em] border-b border-white/5 hover:text-[#C6A66A]"
                >
                  Fragrances
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick({ name: 'collection', collection: 'signature' })}
                  className="text-left py-2 text-sm uppercase tracking-[0.2em] border-b border-white/5 hover:text-[#C6A66A]"
                >
                  Collections
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick({ name: 'collection', category: 'Masculine' })}
                  className="text-left py-2 text-sm uppercase tracking-[0.2em] border-b border-white/5 hover:text-[#C6A66A]"
                >
                  For Him
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick({ name: 'collection', category: 'Feminine' })}
                  className="text-left py-2 text-sm uppercase tracking-[0.2em] border-b border-white/5 hover:text-[#C6A66A]"
                >
                  For Her
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick({ name: 'collection', giftsOnly: true })}
                  className="text-left py-2 text-sm uppercase tracking-[0.2em] border-b border-white/5 hover:text-[#C6A66A]"
                >
                  Gifts & Coffrets
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick({ name: 'story' })}
                  className="text-left py-2 text-sm uppercase tracking-[0.2em] border-b border-white/5 hover:text-[#C6A66A]"
                >
                  Our Story
                </button>
              </nav>
            </div>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full py-3 border border-white/20 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:border-[#C6A66A]"
              >
                <User className="w-4 h-4" />
                Client Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
