import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { BottleSize, Fragrance } from '../types/fragrance';
import { formatCurrency } from '../utils/catalog';
import { LuxuryArtwork } from './LuxuryArtwork';

interface ProductCardProps {
  fragrance: Fragrance;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (fragrance: Fragrance) => void;
  onAddToBag: (fragrance: Fragrance, size: BottleSize, quantity: number) => void;
  onSelectProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  fragrance,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToBag,
  onSelectProduct,
}) => {
  const [selectedSize, setSelectedSize] = useState<BottleSize>('50ml');
  const currentPrice = fragrance.prices[selectedSize];

  return (
    <article className="group flex flex-col bg-[#FFFFFF] border border-[#101010]/10 transition-transform duration-300 hover:-translate-y-0.5">
      {/* Visual Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E9E1D5]/40">
        <button
          type="button"
          onClick={() => onSelectProduct(fragrance.id)}
          aria-label={`View ${fragrance.name} details`}
          className="w-full h-full block text-left"
        >
          <LuxuryArtwork
            variant={fragrance.artwork}
            sizeLabel={selectedSize.toUpperCase()}
            className="w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
          />
        </button>

        {/* Quiet Single Editorial Kicker (Zero-Pill Rule) */}
        {fragrance.badge && (
          <span className="absolute top-3 left-3 bg-[#101010]/85 text-[#F7F4EE] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]">
            {fragrance.badge}
          </span>
        )}

        {/* Wishlist Action */}
        <button
          type="button"
          onClick={() => onToggleWishlist(fragrance.id)}
          aria-label={
            isWishlisted
              ? `Remove ${fragrance.name} from wishlist`
              : `Add ${fragrance.name} to wishlist`
          }
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition-colors border ${
            isWishlisted
              ? 'bg-[#101010] text-[#C6A66A] border-[#C6A66A]'
              : 'bg-white/90 text-[#101010] border-[#101010]/15 hover:bg-[#101010] hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? '#C6A66A' : 'none'} strokeWidth={1.6} />
        </button>

        {/* Hover Quick View Bar */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0 transition-all duration-200">
          <button
            type="button"
            onClick={() => onQuickView(fragrance)}
            className="flex-1 bg-white/95 hover:bg-[#101010] text-[#101010] hover:text-white border border-[#101010]/15 py-2.5 px-3 text-[11px] uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <button
            type="button"
            onClick={() => onAddToBag(fragrance, selectedSize, 1)}
            className="flex-1 bg-[#101010] hover:bg-[#C6A66A] text-white hover:text-[#101010] py-2.5 px-3 text-[11px] uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Copy & Size Selector */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.16em] text-[#292929]/70 mb-1.5">
            <span>
              {fragrance.family} · {fragrance.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[#101010] tabular-nums">
              <Star className="w-3 h-3 fill-[#C6A66A] text-[#C6A66A]" />
              {fragrance.rating.toFixed(1)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectProduct(fragrance.id)}
            className="text-left block w-full group/title"
          >
            <h3 className="font-editorial text-2xl tracking-[0.06em] text-[#101010] group-hover/title:text-[#8E6F36] transition-colors">
              {fragrance.name}
            </h3>
          </button>

          <p className="text-xs text-[#292929]/80 leading-relaxed mt-1.5 line-clamp-2">
            {fragrance.shortDescription}
          </p>
        </div>

        {/* Size Switcher & Tabular Price */}
        <div className="pt-3 border-t border-[#101010]/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1" role="group" aria-label={`Bottle size for ${fragrance.name}`}>
            {fragrance.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 text-[11px] tracking-[0.08em] border transition-colors tabular-nums ${
                  selectedSize === size
                    ? 'bg-[#101010] text-[#F7F4EE] border-[#101010]'
                    : 'bg-transparent text-[#292929] border-[#101010]/15 hover:border-[#101010]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <span className="text-base font-semibold text-[#101010] tabular-nums">
            {formatCurrency(currentPrice)}
          </span>
        </div>
      </div>
    </article>
  );
};
