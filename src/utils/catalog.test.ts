import test from 'node:test';
import assert from 'node:assert/strict';
import { FRAGRANCES } from '../data/fragrances';
import {
  calculateCartTotals,
  filterAndSortFragrances,
  FREE_SHIPPING_THRESHOLD,
  GIFT_WRAP_FEE,
  recommendFromQuiz,
  STANDARD_SHIPPING_FEE,
  validateCheckoutForm,
  validateNewsletterEmail,
} from './catalog';
import { CartItem, CheckoutForm, FilterState } from '../types/fragrance';

const baseFilters: FilterState = {
  family: 'All',
  category: 'All',
  collection: 'All',
  size: 'All',
  priceRange: 'All',
  sort: 'featured',
  searchQuery: '',
};

test('filterAndSortFragrances filters by family including secondary notes and sorts by price', () => {
  const orientals = filterAndSortFragrances(FRAGRANCES, {
    ...baseFilters,
    family: 'Oriental',
    sort: 'price-asc',
  });

  assert.ok(orientals.length >= 2);
  assert.ok(orientals.every((f) => f.family === 'Oriental' || f.secondaryFamily === 'Oriental'));
  for (let i = 1; i < orientals.length; i++) {
    assert.ok(orientals[i - 1].prices['50ml'] <= orientals[i].prices['50ml']);
  }
});

test('filterAndSortFragrances matches search query across notes and titles', () => {
  const oudMatches = filterAndSortFragrances(FRAGRANCES, {
    ...baseFilters,
    searchQuery: 'laotian oud',
  });
  assert.equal(oudMatches.length, 1);
  assert.equal(oudMatches[0].id, 'midnight-oud');
});

test('calculateCartTotals computes subtotal, free shipping threshold, and gift wrap fee', () => {
  const singleSmallItem: CartItem[] = [
    {
      id: 'blanc-absolu-30ml',
      productId: 'blanc-absolu',
      name: 'BLANC ABSOLU',
      subtitle: 'Eau de Parfum',
      size: '30ml',
      price: 140,
      quantity: 1,
      artwork: 'blanc-absolu',
      accentHex: '#C6A66A',
      liquidHex: '#EFE8DA',
    },
  ];

  const underThreshold = calculateCartTotals(singleSmallItem, { giftWrap: false });
  assert.equal(underThreshold.subtotal, 140);
  assert.equal(underThreshold.shippingFee, STANDARD_SHIPPING_FEE);
  assert.equal(underThreshold.amountToFreeShipping, FREE_SHIPPING_THRESHOLD - 140);
  assert.equal(underThreshold.total, 140 + STANDARD_SHIPPING_FEE);

  const overThreshold = calculateCartTotals(
    [{ ...singleSmallItem[0], quantity: 2 }],
    { giftWrap: true }
  );
  assert.equal(overThreshold.subtotal, 280);
  assert.equal(overThreshold.shippingFee, 0);
  assert.equal(overThreshold.giftWrapFee, GIFT_WRAP_FEE);
  assert.equal(overThreshold.total, 280 + GIFT_WRAP_FEE);
});

test('recommendFromQuiz returns 3 ranked fragrances prioritizing preferred family', () => {
  const recs = recommendFromQuiz(FRAGRANCES, {
    mood: 'Radiant & Velvety',
    occasion: 'Daily Signature',
    preferredFamily: 'Floral',
  });
  assert.equal(recs.length, 3);
  assert.equal(recs[0].family, 'Floral');
});

test('validateNewsletterEmail rejects invalid emails and accepts valid ones', () => {
  assert.equal(validateNewsletterEmail('').valid, false);
  assert.equal(validateNewsletterEmail('not-an-email').valid, false);
  assert.equal(validateNewsletterEmail('atelier@noira.paris').valid, true);
});

test('validateCheckoutForm enforces required shipping fields for express delivery', () => {
  const emptyForm: CheckoutForm = {
    fullName: '',
    email: 'bad',
    phone: '123',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    deliveryMethod: 'express',
    paymentMethod: 'concierge-invoice',
    giftNote: '',
  };

  const errors = validateCheckoutForm(emptyForm);
  assert.ok(errors.fullName);
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.ok(errors.address);
  assert.ok(errors.city);
  assert.ok(errors.postalCode);

  const pickupValid: CheckoutForm = {
    ...emptyForm,
    fullName: 'Camille Laurent',
    email: 'camille@example.com',
    phone: '+33 1 42 68 55 00',
    deliveryMethod: 'atelier-pickup',
  };
  assert.deepEqual(validateCheckoutForm(pickupValid), {});
});
