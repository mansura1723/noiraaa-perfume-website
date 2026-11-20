import React from 'react';
import { Gift, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem } from '../types/fragrance';
import { calculateCartTotals, formatCurrency, GIFT_WRAP_FEE } from '../utils/catalog';
import { LuxuryArtwork } from './LuxuryArtwork';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  giftWrap: boolean;
  onToggleGiftWrap: () => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClose: () => void;
  onProceedToCheckout: () => void;
  onExploreFragrances: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  items,
  giftWrap,
  onToggleGiftWrap,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
  onProceedToCheckout,
  onExploreFragrances,
}) => {
  if (!open) return null;

  const totals = calculateCartTotals(items, { giftWrap });
  const progressPct = Math.min(100, Math.round((totals.subtotal / 200) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#F7F4EE] text-[#101010] h-full flex flex-col justify-between shadow-2xl z-10 border-l border-[#101010]/15">
        {/* Header */}
        <div className="px-6 py-5 bg-[#101010] text-[#F7F4EE] flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#C6A66A]" />
            <h2 className="font-editorial text-2xl tracking-[0.08em] text-white">
              YOUR SHOPPING BAG
            </h2>
            <span className="text-xs text-[#C6A66A] tabular-nums">({totals.itemCount})</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="p-1.5 text-[#F7F4EE]/75 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        {items.length > 0 && (
          <div className="px-6 py-3.5 bg-[#FFFFFF] border-b border-[#101010]/10 space-y-2">
            <p className="text-xs text-[#292929]">
              {totals.qualifiesForFreeShipping ? (
                <span>
                  Your order qualifies for{' '}
                  <strong className="font-semibold text-[#101010]">
                    Complimentary Express Delivery
                  </strong>
                  .
                </span>
              ) : (
                <span>
                  Add{' '}
                  <strong className="font-semibold tabular-nums">
                    {formatCurrency(totals.amountToFreeShipping)}
                  </strong>{' '}
                  more for complimentary express shipping.
                </span>
              )}
            </p>
            <div className="h-1 bg-[#E9E1D5] overflow-hidden">
              <div
                className="h-full bg-[#C6A66A] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-5">
              <ShoppingBag className="w-10 h-10 text-[#101010]/25" strokeWidth={1.2} />
              <div className="space-y-2">
                <p className="font-editorial text-2xl text-[#101010]">Your bag is empty</p>
                <p className="text-xs text-[#292929]/75 max-w-xs">
                  Explore our Extrait de Parfum creations and select your signature bottle size.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreFragrances();
                }}
                className="bg-[#101010] hover:bg-[#C6A66A] text-[#F7F4EE] hover:text-[#101010] px-7 py-3 text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Explore Fragrances
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-5 border-b border-[#101010]/10 items-start"
              >
                <div className="w-20 aspect-[4/5] shrink-0 overflow-hidden border border-[#101010]/10 bg-white">
                  <LuxuryArtwork
                    variant={item.artwork}
                    sizeLabel={item.size.toUpperCase()}
                    compact
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-editorial text-xl tracking-[0.04em] text-[#101010]">
                        {item.name}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#8E6F36]">
                        {item.size} · {formatCurrency(item.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.name} ${item.size}`}
                      className="p-1 text-[#292929]/60 hover:text-[#101010]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center border border-[#101010]/20 bg-white">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#E9E1D5]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#E9E1D5]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Totals & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-6 bg-[#FFFFFF] border-t border-[#101010]/15 space-y-4">
            <label className="flex items-center justify-between gap-3 p-3 border border-[#101010]/12 bg-[#F7F4EE] cursor-pointer">
              <span className="flex items-center gap-2.5 text-xs text-[#101010]">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={onToggleGiftWrap}
                  className="accent-[#101010] w-4 h-4"
                />
                <Gift className="w-4 h-4 text-[#8E6F36]" />
                <span>Signature Obsidian Coffret Wrapping</span>
              </span>
              <span className="text-xs font-semibold tabular-nums">
                +{formatCurrency(GIFT_WRAP_FEE)}
              </span>
            </label>

            <div className="space-y-1.5 text-xs text-[#292929]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#101010]">
                  {formatCurrency(totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="tabular-nums">
                  {totals.shippingFee === 0 ? 'Complimentary' : formatCurrency(totals.shippingFee)}
                </span>
              </div>
              {totals.giftWrapFee > 0 && (
                <div className="flex justify-between">
                  <span>Couture Gift Wrapping</span>
                  <span className="tabular-nums">{formatCurrency(totals.giftWrapFee)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-[#101010]/10 text-sm font-semibold text-[#101010]">
                <span>Estimated Total</span>
                <span className="tabular-nums">{formatCurrency(totals.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-[#101010] hover:bg-[#C6A66A] text-[#F7F4EE] hover:text-[#101010] text-xs uppercase tracking-[0.22em] font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
