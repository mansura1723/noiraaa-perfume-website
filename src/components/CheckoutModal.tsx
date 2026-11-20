import React, { useState } from 'react';
import { CheckCircle2, Lock, X } from 'lucide-react';
import { CartItem, CheckoutForm, OrderRecord } from '../types/fragrance';
import {
  calculateCartTotals,
  formatCurrency,
  validateCheckoutForm,
} from '../utils/catalog';
import { LuxuryArtwork } from './LuxuryArtwork';

interface CheckoutModalProps {
  open: boolean;
  items: CartItem[];
  giftWrap: boolean;
  onClose: () => void;
  onOrderConfirmed: (order: OrderRecord) => void;
}

const INITIAL_FORM: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'France',
  deliveryMethod: 'express',
  paymentMethod: 'cash-on-delivery',
  giftNote: '',
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  items,
  giftWrap,
  onClose,
  onOrderConfirmed,
}) => {
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  if (!open) return null;

  const totals = calculateCartTotals(items, {
    giftWrap,
    deliveryMethod: form.deliveryMethod,
  });

  const handleFieldChange = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCheckoutForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const orderNumber = `NOI-${Math.floor(100000 + Math.random() * 900000)}`;
    const shippingSummary =
      form.deliveryMethod === 'atelier-pickup'
        ? 'Paris Salon Pickup — 24 Rue Saint-Honoré'
        : `${form.address}, ${form.city} ${form.postalCode}, ${form.country}`;

    const paymentLabel =
      form.paymentMethod === 'cash-on-delivery'
        ? 'Pay on Delivery (Courier Terminal / Cash)'
        : 'Private Client Concierge Invoice';

    const order: OrderRecord = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      customerName: form.fullName.trim(),
      email: form.email.trim(),
      shippingSummary,
      paymentLabel,
      items: [...items],
      subtotal: totals.subtotal,
      shippingFee: totals.shippingFee,
      giftWrapFee: totals.giftWrapFee,
      total: totals.total,
      giftNote: form.giftNote.trim() || undefined,
    };

    setConfirmedOrder(order);
    onOrderConfirmed(order);
  };

  const handleCloseModal = () => {
    setConfirmedOrder(null);
    setForm(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" onClick={handleCloseModal} />

      <div className="relative w-full max-w-4xl bg-[#F7F4EE] text-[#101010] border border-[#101010]/20 z-10 max-h-[92vh] overflow-y-auto">
        <div className="px-6 sm:px-8 py-5 bg-[#101010] text-[#F7F4EE] flex items-center justify-between border-b border-white/10 sticky top-0 z-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#C6A66A]">
              NOIRA · Private Client Order
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl text-white">
              {confirmedOrder ? 'ORDER CONFIRMED' : 'CHECKOUT & CONCIERGE RESERVATION'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseModal}
            aria-label="Close checkout"
            className="p-1.5 text-[#F7F4EE]/75 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          <div className="p-8 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-[#101010]/10">
              <CheckCircle2 className="w-10 h-10 text-[#8E6F36] shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8E6F36] font-semibold">
                  Order #{confirmedOrder.orderNumber} Confirmed — Preparing Shipment
                </p>
                <h3 className="font-editorial text-3xl text-[#101010] mt-1">
                  Thank you, {confirmedOrder.customerName}
                </h3>
                <p className="text-xs text-[#292929]/75 mt-1">
                  A dispatch confirmation for {confirmedOrder.email} has been recorded in your
                  Client Account.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 border border-[#101010]/10 text-xs space-y-2 md:space-y-0">
              <div className="space-y-1.5">
                <p className="uppercase tracking-[0.18em] text-[#8E6F36] font-semibold">
                  Delivery Destination
                </p>
                <p className="text-sm text-[#101010]">{confirmedOrder.shippingSummary}</p>
                {confirmedOrder.giftNote && (
                  <p className="text-[#292929]/75 pt-1">
                    Gift Note: “{confirmedOrder.giftNote}”
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <p className="uppercase tracking-[0.18em] text-[#8E6F36] font-semibold">
                  Settlement Terms
                </p>
                <p className="text-sm text-[#101010]">{confirmedOrder.paymentLabel}</p>
                <p className="text-[#292929]/75">Date: {confirmedOrder.date}</p>
              </div>
            </div>

            <div className="bg-white border border-[#101010]/10 p-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] font-semibold border-b border-[#101010]/10 pb-3">
                Receipt Summary
              </p>
              {confirmedOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} ({item.size}) × {item.quantity}
                  </span>
                  <span className="tabular-nums font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="pt-3 border-t border-[#101010]/10 flex justify-between text-base font-semibold">
                <span>Total Due ({confirmedOrder.paymentLabel})</span>
                <span className="tabular-nums">{formatCurrency(confirmedOrder.total)}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-[#101010] text-[#F7F4EE] px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-[#C6A66A] hover:text-[#101010] transition-colors"
              >
                Return to Maison NOIRA
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Fields */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8E6F36]">
                  01. Client Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="checkout-name" className="block text-[11px] uppercase tracking-[0.14em] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      placeholder="Camille Laurent"
                      className="w-full bg-white border border-[#101010]/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-[#9E2A2B] mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="block text-[11px] uppercase tracking-[0.14em] mb-1">
                      Email Address *
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      placeholder="camille@example.com"
                      className="w-full bg-white border border-[#101010]/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#9E2A2B] mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="block text-[11px] uppercase tracking-[0.14em] mb-1">
                      Telephone *
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      placeholder="+33 1 42 68 55 00"
                      className="w-full bg-white border border-[#101010]/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#9E2A2B] mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#101010]/10">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8E6F36]">
                  02. Delivery & Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleFieldChange('deliveryMethod', 'express')}
                    className={`p-3.5 border text-left transition-colors ${
                      form.deliveryMethod === 'express'
                        ? 'border-[#101010] bg-white ring-1 ring-[#101010]'
                        : 'border-[#101010]/15 bg-[#F7F4EE]'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                      Express Courier
                    </p>
                    <p className="text-[11px] text-[#292929]/75 mt-1">
                      Complimentary over $200 · 2–3 days
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('deliveryMethod', 'atelier-pickup')}
                    className={`p-3.5 border text-left transition-colors ${
                      form.deliveryMethod === 'atelier-pickup'
                        ? 'border-[#101010] bg-white ring-1 ring-[#101010]'
                        : 'border-[#101010]/15 bg-[#F7F4EE]'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                      Paris Salon Pickup
                    </p>
                    <p className="text-[11px] text-[#292929]/75 mt-1">
                      24 Rue Saint-Honoré · Complimentary
                    </p>
                  </button>
                </div>

                {form.deliveryMethod === 'express' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="sm:col-span-2">
                      <label htmlFor="checkout-address" className="block text-[11px] uppercase tracking-[0.14em] mb-1">
                        Street Address *
                      </label>
                      <input
                        id="checkout-address"
                        type="text"
                        value={form.address}
                        onChange={(e) => handleFieldChange('address', e.target.value)}
                        placeholder="18 Avenue Montaigne"
                        className="w-full bg-white border border-[#101010]/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                      />
                      {errors.address && (
                        <p className="text-xs text-[#9E2A2B] mt-1">{errors.address}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="checkout-city" className="block text-[11px] uppercase tracking-[0.14em] mb-1">
                        City *
                      </label>
                      <input
                        id="checkout-city"
                        type="text"
                        value={form.city}
                        onChange={(e) => handleFieldChange('city', e.target.value)}
                        placeholder="Paris"
                        className="w-full bg-white border border-[#101010]/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                      />
                      {errors.city && (
                        <p className="text-xs text-[#9E2A2B] mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="checkout-postal" className="block text-[11px] uppercase tracking-[0.14em] mb-1">
                        Postal Code *
                      </label>
                      <input
                        id="checkout-postal"
                        type="text"
                        value={form.postalCode}
                        onChange={(e) => handleFieldChange('postalCode', e.target.value)}
                        placeholder="75008"
                        className="w-full bg-white border border-[#101010]/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                      />
                      {errors.postalCode && (
                        <p className="text-xs text-[#9E2A2B] mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="checkout-country" className="block text-[11px] uppercase tracking-[0.14em] mb-1">
                        Country *
                      </label>
                      <input
                        id="checkout-country"
                        type="text"
                        value={form.country}
                        onChange={(e) => handleFieldChange('country', e.target.value)}
                        className="w-full bg-white border border-[#101010]/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                      />
                      {errors.country && (
                        <p className="text-xs text-[#9E2A2B] mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-[#101010]/10">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8E6F36]">
                  03. Settlement Preference
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleFieldChange('paymentMethod', 'cash-on-delivery')}
                    className={`p-3.5 border text-left transition-colors ${
                      form.paymentMethod === 'cash-on-delivery'
                        ? 'border-[#101010] bg-white ring-1 ring-[#101010]'
                        : 'border-[#101010]/15 bg-[#F7F4EE]'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em]">
                      Pay Upon Delivery
                    </p>
                    <p className="text-[11px] text-[#292929]/75 mt-1">
                      Settle with courier via cash or mobile terminal on arrival.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('paymentMethod', 'concierge-invoice')}
                    className={`p-3.5 border text-left transition-colors ${
                      form.paymentMethod === 'concierge-invoice'
                        ? 'border-[#101010] bg-white ring-1 ring-[#101010]'
                        : 'border-[#101010]/15 bg-[#F7F4EE]'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em]">
                      Concierge Invoice
                    </p>
                    <p className="text-[11px] text-[#292929]/75 mt-1">
                      Reserve stock now; our Paris concierge dispatches a secure payment link.
                    </p>
                  </button>
                </div>

                <div>
                  <label htmlFor="checkout-note" className="block text-[11px] uppercase tracking-[0.14em] mb-1">
                    Complimentary Calligraphy Gift Note (Optional)
                  </label>
                  <input
                    id="checkout-note"
                    type="text"
                    value={form.giftNote}
                    onChange={(e) => handleFieldChange('giftNote', e.target.value)}
                    placeholder="Add a personal message for the recipient..."
                    className="w-full bg-white border border-[#101010]/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#101010]/10 p-6 space-y-5 sticky top-24">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#101010]/10 pb-3">
                  Order Summary ({totals.itemCount})
                </h3>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="w-12 aspect-[4/5] shrink-0 overflow-hidden bg-[#F7F4EE]">
                        <LuxuryArtwork variant={item.artwork} compact className="w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-editorial text-lg text-[#101010] truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#292929]/70 tabular-nums">
                          {item.size} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium tabular-nums">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-3 border-t border-[#101010]/10 text-xs text-[#292929]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="tabular-nums">
                      {totals.shippingFee === 0
                        ? 'Complimentary'
                        : formatCurrency(totals.shippingFee)}
                    </span>
                  </div>
                  {totals.giftWrapFee > 0 && (
                    <div className="flex justify-between">
                      <span>Obsidian Gift Wrapping</span>
                      <span className="tabular-nums">{formatCurrency(totals.giftWrapFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-[#101010]/10 text-base font-semibold text-[#101010]">
                    <span>Total</span>
                    <span className="tabular-nums">{formatCurrency(totals.total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#101010] hover:bg-[#C6A66A] text-[#F7F4EE] hover:text-[#101010] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Confirm & Place Order
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
