import React from 'react';
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { BottleSize, Fragrance } from '../types/fragrance';
import { formatCurrency } from '../utils/catalog';
import { LuxuryArtwork } from './LuxuryArtwork';

interface WishlistDrawerProps {
  open: boolean;
  wishlistIds: string[];
  onClose: () => void;
  onRemoveWishlist: (productId: string) => void;
  onAddToBag: (fragrance: Fragrance, size: BottleSize, quantity: number) => void;
  onSelectProduct: (productId: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  open,
  wishlistIds,
  onClose,
  onRemoveWishlist,
  onAddToBag,
  onSelectProduct,
}) => {
  if (!open) return null;

  const savedFragrances = FRAGRANCES.filter((f) => wishlistIds.includes(f.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Wishlist">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#F7F4EE] text-[#101010] h-full flex flex-col z-10 border-l border-[#101010]/15">
        <div className="px-6 py-5 bg-[#101010] text-[#F7F4EE] flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-[#C6A66A]" />
            <h2 className="font-editorial text-2xl tracking-[0.08em] text-white">
              SAVED FRAGRANCES
            </h2>
            <span className="text-xs text-[#C6A66A] tabular-nums">({savedFragrances.length})</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 text-[#F7F4EE]/75 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {savedFragrances.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
              <Heart className="w-9 h-9 text-[#101010]/25" strokeWidth={1.2} />
              <p className="font-editorial text-2xl text-[#101010]">No saved creations yet</p>
              <p className="text-xs text-[#292929]/75 max-w-xs">
                Tap the heart icon on any fragrance to curate your personal scent wardrobe.
              </p>
            </div>
          ) : (
            savedFragrances.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-5 border-b border-[#101010]/10 items-start"
              >
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectProduct(item.id);
                  }}
                  className="w-20 aspect-[4/5] shrink-0 overflow-hidden bg-white border border-[#101010]/10"
                >
                  <LuxuryArtwork variant={item.artwork} compact className="w-full h-full" />
                </button>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProduct(item.id);
                      }}
                      className="text-left"
                    >
                      <h3 className="font-editorial text-xl text-[#101010] hover:text-[#8E6F36]">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#292929]/70 tabular-nums">
                        50ml · {formatCurrency(item.prices['50ml'])}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveWishlist(item.id)}
                      aria-label={`Remove ${item.name} from wishlist`}
                      className="p-1 text-[#292929]/60 hover:text-[#101010]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onAddToBag(item, '50ml', 1);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#101010] hover:bg-[#C6A66A] text-white hover:text-[#101010] text-[11px] uppercase tracking-[0.16em] transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add 50ml to Bag
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
