import {
  BottleSize,
  CartItem,
  CheckoutForm,
  FilterState,
  Fragrance,
  QuizAnswers,
} from '../types/fragrance';

export const FREE_SHIPPING_THRESHOLD = 200;
export const STANDARD_SHIPPING_FEE = 18;
export const GIFT_WRAP_FEE = 12;

export function getSizePrice(fragrance: Fragrance, size: BottleSize): number {
  return fragrance.prices[size] ?? fragrance.prices['50ml'];
}

export function filterAndSortFragrances(
  fragrances: Fragrance[],
  filters: FilterState
): Fragrance[] {
  const query = filters.searchQuery.trim().toLowerCase();

  const filtered = fragrances.filter((item) => {
    if (filters.family !== 'All') {
      const matchesPrimary = item.family === filters.family;
      const matchesSecondary = item.secondaryFamily === filters.family;
      if (!matchesPrimary && !matchesSecondary) return false;
    }

    if (filters.category !== 'All' && item.category !== filters.category) {
      return false;
    }

    if (filters.collection !== 'All' && item.collection !== filters.collection) {
      return false;
    }

    if (filters.size !== 'All' && !item.sizes.includes(filters.size)) {
      return false;
    }

    const basePrice = item.prices['50ml'];
    if (filters.priceRange === 'Under 200' && basePrice >= 200) {
      return false;
    }
    if (filters.priceRange === '200-300' && (basePrice < 200 || basePrice > 300)) {
      return false;
    }
    if (filters.priceRange === 'Over 300' && basePrice <= 300) {
      return false;
    }

    if (query) {
      const haystack = [
        item.name,
        item.subtitle,
        item.family,
        item.shortDescription,
        ...item.topNotes,
        ...item.heartNotes,
        ...item.baseNotes,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });

  const sorted = [...filtered];
  switch (filters.sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.prices['50ml'] - b.prices['50ml']);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.prices['50ml'] - a.prices['50ml']);
      break;
    case 'popularity':
      sorted.sort((a, b) => b.popularity - a.popularity);
      break;
    case 'newest':
      sorted.sort((a, b) => b.releaseOrder - a.releaseOrder);
      break;
    case 'featured':
    default:
      sorted.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return sorted;
}

export interface CartTotals {
  subtotal: number;
  shippingFee: number;
  giftWrapFee: number;
  total: number;
  itemCount: number;
  amountToFreeShipping: number;
  qualifiesForFreeShipping: boolean;
}

export function calculateCartTotals(
  items: CartItem[],
  options: { giftWrap?: boolean; deliveryMethod?: 'express' | 'atelier-pickup' } = {}
): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const isPickup = options.deliveryMethod === 'atelier-pickup';
  const shippingFee =
    subtotal === 0 || isPickup || qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const giftWrapFee = items.length > 0 && options.giftWrap ? GIFT_WRAP_FEE : 0;
  const total = subtotal + shippingFee + giftWrapFee;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return {
    subtotal,
    shippingFee,
    giftWrapFee,
    total,
    itemCount,
    amountToFreeShipping,
    qualifiesForFreeShipping,
  };
}

export function recommendFromQuiz(
  fragrances: Fragrance[],
  answers: QuizAnswers
): Fragrance[] {
  const scored = fragrances.map((item) => {
    let score = 0;

    if (answers.preferredFamily) {
      if (item.family === answers.preferredFamily) score += 5;
      else if (item.secondaryFamily === answers.preferredFamily) score += 3;
    }

    if (answers.mood === 'Nocturnal & Magnetic') {
      if (item.family === 'Oriental' || item.family === 'Woody') score += 3;
      if (item.collection === 'signature' || item.collection === 'masculine') score += 1;
    } else if (answers.mood === 'Radiant & Velvety') {
      if (item.family === 'Floral') score += 3;
      if (item.collection === 'feminine') score += 2;
    } else if (answers.mood === 'Crisp & Architectural') {
      if (item.family === 'Fresh' || item.family === 'Citrus') score += 3;
    } else if (answers.mood === 'Warm & Resinous') {
      if (item.family === 'Amber' || item.family === 'Gourmand') score += 3;
      if (item.collection === 'exclusive') score += 2;
    }

    if (answers.occasion === 'Evening Gala' && item.sillage.score >= 82) score += 2;
    if (answers.occasion === 'Daily Signature' && item.sillage.score <= 80) score += 2;
    if (answers.occasion === 'Intimate & Personal' && item.longevity.score >= 85) score += 1;

    return { item, score: score + item.popularity * 0.01 };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.item);
}

export function validateNewsletterEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}

export function validateCheckoutForm(
  form: CheckoutForm
): Partial<Record<keyof CheckoutForm, string>> {
  const errors: Partial<Record<keyof CheckoutForm, string>> = {};

  if (!form.fullName.trim() || form.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const emailCheck = validateNewsletterEmail(form.email);
  if (!emailCheck.valid) {
    errors.email = emailCheck.error;
  }

  const digits = form.phone.replace(/\D/g, '');
  if (digits.length < 7) {
    errors.phone = 'Please enter a valid telephone number.';
  }

  if (form.deliveryMethod === 'express') {
    if (!form.address.trim() || form.address.trim().length < 5) {
      errors.address = 'Please enter a complete street address.';
    }
    if (!form.city.trim()) {
      errors.city = 'Please enter your city.';
    }
    if (!form.postalCode.trim() || form.postalCode.trim().length < 3) {
      errors.postalCode = 'Please enter a valid postal code.';
    }
    if (!form.country.trim()) {
      errors.country = 'Please select or enter a country.';
    }
  }

  return errors;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
