import React from 'react';
import { Package, User, X } from 'lucide-react';
import { OrderRecord } from '../types/fragrance';
import { formatCurrency } from '../utils/catalog';

interface AccountModalProps {
  open: boolean;
  orders: OrderRecord[];
  wishlistCount: number;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  open,
  orders,
  wishlistCount,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Client Account"
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#F7F4EE] text-[#101010] border border-[#101010]/20 z-10 max-h-[88vh] overflow-y-auto">
        <div className="px-6 py-5 bg-[#101010] text-[#F7F4EE] flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-[#C6A66A]" />
            <h2 className="font-editorial text-2xl tracking-[0.06em] text-white">
              CLIENT DOSSIER
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close client dossier"
            className="p-1.5 text-[#F7F4EE]/75 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4 bg-white border border-[#101010]/10 p-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8E6F36]">
                Placed Orders
              </p>
              <p className="font-editorial text-3xl mt-1 tabular-nums">{orders.length}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8E6F36]">
                Saved Wishlist
              </p>
              <p className="font-editorial text-3xl mt-1 tabular-nums">{wishlistCount}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold">
              Order History
            </h3>

            {orders.length === 0 ? (
              <div className="bg-white border border-[#101010]/10 p-8 text-center space-y-2">
                <Package className="w-8 h-8 text-[#101010]/25 mx-auto" strokeWidth={1.2} />
                <p className="font-editorial text-2xl">No orders recorded yet</p>
                <p className="text-xs text-[#292929]/75">
                  Completed orders from this browser appear here immediately with full receipt details.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="bg-white border border-[#101010]/10 p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#101010]/10 pb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                        Order #{order.orderNumber}
                      </p>
                      <p className="text-[11px] text-[#292929]/70">
                        {order.date} · {order.paymentLabel}
                      </p>
                    </div>
                    <span className="text-base font-semibold tabular-nums">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                  <ul className="text-xs space-y-1 text-[#292929]/85">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>
                          {item.name} ({item.size}) × {item.quantity}
                        </span>
                        <span className="tabular-nums">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-[#292929]/65">
                    Destination: {order.shippingSummary}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
