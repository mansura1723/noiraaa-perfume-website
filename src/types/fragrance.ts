export type BottleSize = '30ml' | '50ml' | '100ml';

export type FragranceFamily =
  | 'Floral'
  | 'Woody'
  | 'Oriental'
  | 'Fresh'
  | 'Citrus'
  | 'Amber'
  | 'Gourmand';

export type GenderCategory = 'Feminine' | 'Masculine' | 'Unisex';

export type CollectionSlug = 'feminine' | 'masculine' | 'signature' | 'exclusive';

export type BadgeType = 'Bestseller' | 'New Arrival' | 'Limited Edition';

export type ArtworkVariant =
  | 'noir-eternel'
  | 'velvet-rose'
  | 'golden-ember'
  | 'midnight-oud'
  | 'blanc-absolu'
  | 'rose-imperiale'
  | 'ambre-fume'
  | 'cedre-solaire';

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Fragrance {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  family: FragranceFamily;
  secondaryFamily?: FragranceFamily;
  category: GenderCategory;
  collection: CollectionSlug;
  badge?: BadgeType;
  shortDescription: string;
  editorialStory: string;
  concentration: string;
  prices: Record<BottleSize, number>;
  sizes: BottleSize[];
  rating: number;
  reviewCount: number;
  popularity: number;
  releaseOrder: number;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: { label: string; score: number; hours: string };
  sillage: { label: string; score: number };
  ingredients: string;
  artwork: ArtworkVariant;
  accentHex: string;
  liquidHex: string;
  isGiftSet?: boolean;
  reviews: Review[];
}

export interface CollectionMeta {
  slug: CollectionSlug;
  title: string;
  kicker: string;
  description: string;
  featuredProductId: string;
  theme: 'dark' | 'light';
}

export interface CartItem {
  id: string; // productId + size
  productId: string;
  name: string;
  subtitle: string;
  size: BottleSize;
  price: number;
  quantity: number;
  artwork: ArtworkVariant;
  accentHex: string;
  liquidHex: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'popularity' | 'newest';

export interface FilterState {
  family: FragranceFamily | 'All';
  category: GenderCategory | 'All';
  collection: CollectionSlug | 'All';
  size: BottleSize | 'All';
  priceRange: 'All' | 'Under 200' | '200-300' | 'Over 300';
  sort: SortOption;
  searchQuery: string;
}

export interface QuizAnswers {
  mood: 'Nocturnal & Magnetic' | 'Radiant & Velvety' | 'Crisp & Architectural' | 'Warm & Resinous' | null;
  occasion: 'Evening Gala' | 'Daily Signature' | 'Intimate & Personal' | null;
  preferredFamily: FragranceFamily | null;
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: 'express' | 'atelier-pickup';
  paymentMethod: 'concierge-invoice' | 'cash-on-delivery';
  giftNote: string;
}

export interface OrderRecord {
  orderNumber: string;
  date: string;
  customerName: string;
  email: string;
  shippingSummary: string;
  paymentLabel: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  giftWrapFee: number;
  total: number;
  giftNote?: string;
}

export type PageView =
  | { name: 'home' }
  | { name: 'collection'; collection?: CollectionSlug; category?: GenderCategory; giftsOnly?: boolean }
  | { name: 'product'; productId: string }
  | { name: 'story' };
