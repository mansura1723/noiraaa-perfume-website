import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { COLLECTIONS, FRAGRANCES, FRAGRANCE_FAMILIES, GIFT_COFFRETS } from '../data/fragrances';
import {
  BottleSize,
  CollectionSlug,
  FilterState,
  Fragrance,
  FragranceFamily,
  GenderCategory,
  SortOption,
} from '../types/fragrance';
import { filterAndSortFragrances, formatCurrency } from '../utils/catalog';
import { LuxuryArtwork } from './LuxuryArtwork';
import { ProductCard } from './ProductCard';

interface CollectionPageProps {
  filters: FilterState;
  giftsOnly?: boolean;
  onUpdateFilters: (patch: Partial<FilterState>) => void;
  onResetFilters: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (fragrance: Fragrance) => void;
  onAddToBag: (fragrance: Fragrance, size: BottleSize, quantity: number) => void;
  onSelectProduct: (productId: string) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  filters,
  giftsOnly = false,
  onUpdateFilters,
  onResetFilters,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToBag,
  onSelectProduct,
}) => {
  const activeCollectionMeta =
    filters.collection !== 'All'
      ? COLLECTIONS.find((c) => c.slug === filters.collection)
      : undefined;

  const filteredProducts = filterAndSortFragrances(FRAGRANCES, filters);

  const bannerTitle = giftsOnly
    ? 'EXCLUSIVE GIFT COFFRETS'
    : activeCollectionMeta
    ? activeCollectionMeta.title
    : filters.category !== 'All'
    ? `FRAGRANCES · ${filters.category.toUpperCase()}`
    : 'HAUTE PARFUMERIE CATALOGUE';

  const bannerDescription = giftsOnly
    ? 'Presented in matte obsidian coffrets lined with warm ivory silk, ready for bespoke gifting.'
    : activeCollectionMeta
    ? activeCollectionMeta.description
    : 'Explore the complete NOIRA repertoire—from intimate skin musks to oak-macerated Extraits de Parfum.';

  const hasActiveFilters =
    filters.family !== 'All' ||
    filters.category !== 'All' ||
    filters.collection !== 'All' ||
    filters.size !== 'All' ||
    filters.priceRange !== 'All' ||
    Boolean(filters.searchQuery.trim());

  return (
    <main className="bg-[#F7F4EE] min-h-screen">
      {/* Editorial Collection Banner */}
      <section className="bg-[#101010] text-[#F7F4EE] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#C6A66A]">
              Maison NOIRA · Paris
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl tracking-[0.05em] text-white text-balance">
              {bannerTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#E9E1D5]/80 max-w-2xl leading-relaxed">
              {bannerDescription}
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="w-full max-w-sm aspect-[4/3] border border-[#C6A66A]/25 overflow-hidden">
              <LuxuryArtwork
                variant={
                  activeCollectionMeta
                    ? (FRAGRANCES.find((f) => f.id === activeCollectionMeta.featuredProductId)?.artwork ??
                      'noir-eternel')
                    : giftsOnly
                    ? 'golden-ember'
                    : 'noir-eternel'
                }
                scene={giftsOnly ? 'coffret' : activeCollectionMeta ? 'flacon' : 'atelier'}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {giftsOnly ? (
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GIFT_COFFRETS.map((gift) => {
              const linked = FRAGRANCES.find((f) => f.id === gift.linkedProductId)!;
              return (
                <div
                  key={gift.id}
                  className="bg-[#FFFFFF] border border-[#101010]/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] overflow-hidden">
                      <LuxuryArtwork variant={gift.artwork} scene="coffret" className="w-full h-full" />
                    </div>
                    <div className="p-6 space-y-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8E6F36]">
                        {gift.contents}
                      </p>
                      <h2 className="font-editorial text-2xl tracking-[0.05em] text-[#101010]">
                        {gift.name}
                      </h2>
                      <p className="text-xs text-[#292929]/80 leading-relaxed">
                        {gift.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-3 border-t border-[#101010]/10 flex items-center justify-between">
                    <span className="text-base font-semibold tabular-nums">
                      {formatCurrency(gift.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onAddToBag(linked, '50ml', 1)}
                      className="bg-[#101010] hover:bg-[#C6A66A] text-white hover:text-[#101010] px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-12 lg:py-16">
          {/* Multi-Facet Filter & Sort Toolbar */}
          <div className="bg-[#FFFFFF] border border-[#101010]/10 p-5 sm:p-6 mb-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#101010]/10 pb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#101010] font-semibold">
                <SlidersHorizontal className="w-4 h-4 text-[#8E6F36]" />
                Refine Selection
                <span className="text-[#292929]/60 font-normal tabular-nums">
                  ({filteredProducts.length} {filteredProducts.length === 1 ? 'Creation' : 'Creations'})
                </span>
              </div>

              <div className="flex items-center gap-4">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="text-xs uppercase tracking-[0.14em] text-[#8E6F36] hover:text-[#101010] inline-flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reset Filters
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <label htmlFor="catalog-sort" className="text-xs uppercase tracking-[0.14em] text-[#292929]/70">
                    Sort:
                  </label>
                  <select
                    id="catalog-sort"
                    value={filters.sort}
                    onChange={(e) => onUpdateFilters({ sort: e.target.value as SortOption })}
                    className="bg-[#F7F4EE] border border-[#101010]/20 px-3 py-1.5 text-xs text-[#101010] focus:outline-none focus:border-[#101010]"
                  >
                    <option value="featured">Featured Icons</option>
                    <option value="popularity">Most Popular</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Filter Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label htmlFor="filter-family" className="block text-[10px] uppercase tracking-[0.18em] text-[#292929]/70 mb-1.5">
                  Fragrance Family
                </label>
                <select
                  id="filter-family"
                  value={filters.family}
                  onChange={(e) =>
                    onUpdateFilters({ family: e.target.value as FragranceFamily | 'All' })
                  }
                  className="w-full bg-[#F7F4EE] border border-[#101010]/15 px-3 py-2 text-xs text-[#101010] focus:outline-none focus:border-[#101010]"
                >
                  <option value="All">All Families</option>
                  {FRAGRANCE_FAMILIES.map((f) => (
                    <option key={f.family} value={f.family}>
                      {f.family}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filter-category" className="block text-[10px] uppercase tracking-[0.18em] text-[#292929]/70 mb-1.5">
                  Category
                </label>
                <select
                  id="filter-category"
                  value={filters.category}
                  onChange={(e) =>
                    onUpdateFilters({ category: e.target.value as GenderCategory | 'All' })
                  }
                  className="w-full bg-[#F7F4EE] border border-[#101010]/15 px-3 py-2 text-xs text-[#101010] focus:outline-none focus:border-[#101010]"
                >
                  <option value="All">All Categories</option>
                  <option value="Feminine">Feminine (For Her)</option>
                  <option value="Masculine">Masculine (For Him)</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label htmlFor="filter-collection" className="block text-[10px] uppercase tracking-[0.18em] text-[#292929]/70 mb-1.5">
                  Collection
                </label>
                <select
                  id="filter-collection"
                  value={filters.collection}
                  onChange={(e) =>
                    onUpdateFilters({ collection: e.target.value as CollectionSlug | 'All' })
                  }
                  className="w-full bg-[#F7F4EE] border border-[#101010]/15 px-3 py-2 text-xs text-[#101010] focus:outline-none focus:border-[#101010]"
                >
                  <option value="All">All Collections</option>
                  {COLLECTIONS.map((col) => (
                    <option key={col.slug} value={col.slug}>
                      {col.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filter-price" className="block text-[10px] uppercase tracking-[0.18em] text-[#292929]/70 mb-1.5">
                  Price (50ml)
                </label>
                <select
                  id="filter-price"
                  value={filters.priceRange}
                  onChange={(e) =>
                    onUpdateFilters({
                      priceRange: e.target.value as FilterState['priceRange'],
                    })
                  }
                  className="w-full bg-[#F7F4EE] border border-[#101010]/15 px-3 py-2 text-xs text-[#101010] focus:outline-none focus:border-[#101010]"
                >
                  <option value="All">All Prices</option>
                  <option value="Under 200">Under $200</option>
                  <option value="200-300">$200 – $300</option>
                  <option value="Over 300">Over $300</option>
                </select>
              </div>

              <div>
                <label htmlFor="filter-size" className="block text-[10px] uppercase tracking-[0.18em] text-[#292929]/70 mb-1.5">
                  Bottle Size
                </label>
                <select
                  id="filter-size"
                  value={filters.size}
                  onChange={(e) =>
                    onUpdateFilters({ size: e.target.value as BottleSize | 'All' })
                  }
                  className="w-full bg-[#F7F4EE] border border-[#101010]/15 px-3 py-2 text-xs text-[#101010] focus:outline-none focus:border-[#101010]"
                >
                  <option value="All">All Sizes</option>
                  <option value="30ml">30ml Travel Flacon</option>
                  <option value="50ml">50ml Classic</option>
                  <option value="100ml">100ml Signature</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#FFFFFF] border border-[#101010]/10 py-20 px-6 text-center space-y-4">
              <p className="font-editorial text-3xl text-[#101010]">
                No creations match your current selection
              </p>
              <p className="text-sm text-[#292929]/75 max-w-md mx-auto">
                Adjust one of your fragrance family, price, or collection filters to explore our
                full Parisian repertoire.
              </p>
              <button
                type="button"
                onClick={onResetFilters}
                className="bg-[#101010] text-[#F7F4EE] px-7 py-3 text-xs uppercase tracking-[0.2em] hover:bg-[#C6A66A] hover:text-[#101010] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((fragrance) => (
                <ProductCard
                  key={fragrance.id}
                  fragrance={fragrance}
                  isWishlisted={wishlistIds.includes(fragrance.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  onAddToBag={onAddToBag}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
};
