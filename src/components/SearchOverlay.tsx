import React, { useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { filterAndSortFragrances, formatCurrency } from '../utils/catalog';
import { LuxuryArtwork } from './LuxuryArtwork';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  onSearchInCatalog: (query: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  open,
  onClose,
  onSelectProduct,
  onSearchInCatalog,
}) => {
  const [query, setQuery] = useState('');

  if (!open) return null;

  const matches = filterAndSortFragrances(FRAGRANCES, {
    family: 'All',
    category: 'All',
    collection: 'All',
    size: 'All',
    priceRange: 'All',
    sort: 'popularity',
    searchQuery: query,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchInCatalog(query);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#101010]/96 text-[#F7F4EE] backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Search fragrances"
    >
      <div className="max-w-5xl w-full mx-auto px-6 py-8 flex-1 flex flex-col">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <span className="text-[11px] uppercase tracking-[0.26em] text-[#C6A66A]">
            Search the NOIRA Repertoire
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-2 text-[#F7F4EE]/75 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-8 border-b border-white/15">
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-[#C6A66A] shrink-0" />
            <label htmlFor="global-search-input" className="sr-only">
              Search by fragrance name, note, or family
            </label>
            <input
              id="global-search-input"
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by scent, note (e.g., Oud, Rose, Saffron), or family..."
              className="w-full bg-transparent text-xl sm:text-3xl font-editorial text-white placeholder:text-white/35 focus:outline-none"
            />
            {query && (
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C6A66A] text-[#101010] text-xs uppercase tracking-[0.18em] font-semibold shrink-0"
              >
                View All
              </button>
            )}
          </div>
        </form>

        <div className="py-8 overflow-y-auto flex-1">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#E9E1D5]/60 mb-5">
            {query.trim()
              ? `${matches.length} ${matches.length === 1 ? 'Result' : 'Results'}`
              : 'Suggested Icons'}
          </p>

          {matches.length === 0 ? (
            <p className="text-sm text-[#E9E1D5]/75">
              No fragrances matched “{query}”. Try searching for Rose, Oud, Amber, Citrus, or Saffron.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {matches.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectProduct(item.id);
                    onClose();
                  }}
                  className="flex gap-4 p-3 border border-white/10 hover:border-[#C6A66A] text-left bg-[#161514] transition-colors group"
                >
                  <div className="w-16 aspect-[4/5] shrink-0 overflow-hidden">
                    <LuxuryArtwork variant={item.artwork} compact className="w-full h-full" />
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#C6A66A]">
                        {item.family}
                      </p>
                      <p className="font-editorial text-xl text-white group-hover:text-[#C6A66A] truncate">
                        {item.name}
                      </p>
                    </div>
                    <p className="text-xs text-[#E9E1D5]/75 inline-flex items-center justify-between tabular-nums">
                      <span>50ml · {formatCurrency(item.prices['50ml'])}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
