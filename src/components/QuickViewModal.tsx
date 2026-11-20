import React, { useState } from 'react';
import { ArrowRight, Heart, ShoppingBag, X } from 'lucide-react';
import { BottleSize, Fragrance } from '../types/fragrance';
import { formatCurrency } from '../utils/catalog';
import { LuxuryArtwork } from './LuxuryArtwork';

interface QuickViewModalProps {
  fragrance: Fragrance | null;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToBag: (fragrance: Fragrance, size: BottleSize, quantity: number) => void;
  onViewDetails: (productId: string) => void;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  fragrance,
  isWishlisted,
  onToggleWishlist,
  onAddToBag,
  onViewDetails,
  onClose,
}) => {
  const [size, setSize] = useState<BottleSize>('50ml');

  if (!fragrance) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view ${fragrance.name}`}
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#FFFFFF] text-[#101010] border border-[#101010]/20 grid grid-cols-1 md:grid-cols-12 z-10 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 text-[#101010] hover:bg-[#101010] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="md:col-span-5 aspect-[4/5] md:aspect-auto bg-[#F7F4EE]">
          <LuxuryArtwork
            variant={fragrance.artwork}
            sizeLabel={size.toUpperCase()}
            className="w-full h-full min-h-[280px]"
          />
        </div>

        <div className="md:col-span-7 p-7 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8E6F36]">
              {fragrance.concentration} · {fragrance.family}
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl tracking-[0.04em] text-[#101010]">
              {fragrance.name}
            </h2>
            <p className="text-xl font-editorial tabular-nums text-[#101010]">
              {formatCurrency(fragrance.prices[size])}
            </p>
            <p className="text-sm text-[#292929]/80 leading-relaxed">
              {fragrance.shortDescription}
            </p>

            <div className="pt-2 border-t border-[#101010]/10 space-y-1.5 text-xs">
              <p>
                <span className="uppercase tracking-[0.14em] text-[#8E6F36] mr-2">Top:</span>
                {fragrance.topNotes.join(', ')}
              </p>
              <p>
                <span className="uppercase tracking-[0.14em] text-[#8E6F36] mr-2">Heart:</span>
                {fragrance.heartNotes.join(', ')}
              </p>
              <p>
                <span className="uppercase tracking-[0.14em] text-[#8E6F36] mr-2">Base:</span>
                {fragrance.baseNotes.join(', ')}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="block text-[11px] uppercase tracking-[0.16em] font-semibold">
                Select Size
              </span>
              <div className="flex gap-2">
                {fragrance.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 text-xs border transition-colors tabular-nums ${
                      size === s
                        ? 'bg-[#101010] text-white border-[#101010]'
                        : 'bg-[#F7F4EE] text-[#101010] border-[#101010]/15'
                    }`}
                  >
                    {s} · {formatCurrency(fragrance.prices[s])}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onAddToBag(fragrance, size, 1);
                  onClose();
                }}
                className="flex-1 py-3 bg-[#101010] hover:bg-[#C6A66A] text-white hover:text-[#101010] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
              <button
                type="button"
                onClick={() => onToggleWishlist(fragrance.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`w-11 border flex items-center justify-center ${
                  isWishlisted
                    ? 'bg-[#101010] border-[#101010] text-[#C6A66A]'
                    : 'border-[#101010]/20 text-[#101010]'
                }`}
              >
                <Heart className="w-4 h-4" fill={isWishlisted ? '#C6A66A' : 'none'} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onViewDetails(fragrance.id);
              }}
              className="w-full py-2 text-xs uppercase tracking-[0.18em] text-[#101010] hover:text-[#8E6F36] inline-flex items-center justify-center gap-1.5"
            >
              View Full Fragrance Dossier
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
