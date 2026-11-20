import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { BottleSize, Fragrance, Review } from '../types/fragrance';
import { formatCurrency } from '../utils/catalog';
import { ArtworkScene, LuxuryArtwork } from './LuxuryArtwork';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  fragrance: Fragrance;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToBag: (fragrance: Fragrance, size: BottleSize, quantity: number) => void;
  onBuyNow: (fragrance: Fragrance, size: BottleSize, quantity: number) => void;
  onSelectProduct: (productId: string) => void;
  onBackToCollection: () => void;
  onQuickView: (fragrance: Fragrance) => void;
  wishlistIds: string[];
}

const GALLERY_VIEWS: { scene: ArtworkScene; label: string }[] = [
  { scene: 'flacon', label: 'Studio Flacon' },
  { scene: 'detail', label: 'Architectural Detail' },
  { scene: 'packaging', label: 'Couture Presentation Box' },
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  fragrance,
  isWishlisted,
  onToggleWishlist,
  onAddToBag,
  onBuyNow,
  onSelectProduct,
  onBackToCollection,
  onQuickView,
  wishlistIds,
}) => {
  const [selectedSize, setSelectedSize] = useState<BottleSize>('50ml');
  const [quantity, setQuantity] = useState(1);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<'ingredients' | 'shipping' | null>('shipping');
  const [localReviews, setLocalReviews] = useState<Review[]>(fragrance.reviews);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const unitPrice = fragrance.prices[selectedSize];
  const primaryMatches = FRAGRANCES.filter(
    (item) =>
      item.id !== fragrance.id &&
      (item.family === fragrance.family ||
        item.secondaryFamily === fragrance.family ||
        item.family === fragrance.secondaryFamily ||
        item.collection === fragrance.collection)
  );
  const related = [
    ...primaryMatches,
    ...FRAGRANCES.filter(
      (item) => item.id !== fragrance.id && !primaryMatches.some((m) => m.id === item.id)
    ),
  ].slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewTitle.trim() || !reviewComment.trim()) {
      setReviewError('Please complete your name, review headline, and impression.');
      return;
    }
    const newReview: Review = {
      id: `rev-user-${Date.now()}`,
      author: reviewAuthor.trim(),
      location: 'Verified Client',
      rating: reviewRating,
      date: 'November 2026',
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
      verified: true,
    };
    setLocalReviews((prev) => [newReview, ...prev]);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setReviewError(null);
    setReviewSubmitted(true);
  };

  return (
    <main className="bg-[#F7F4EE] text-[#101010] pb-20 md:pb-0">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#101010]/10 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToCollection}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#292929] hover:text-[#101010]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Catalogue
          </button>
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#8E6F36] hidden sm:inline">
            {fragrance.collection} Collection · {fragrance.family}
          </span>
        </div>
      </div>

      {/* Main Split Gallery + Contiguous Purchase Module */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Sticky Multi-Image Gallery */}
        <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-4">
          <div className="aspect-[4/5] w-full border border-[#101010]/12 overflow-hidden bg-[#FFFFFF]">
            <LuxuryArtwork
              variant={fragrance.artwork}
              scene={GALLERY_VIEWS[activeGalleryIdx].scene}
              sizeLabel={selectedSize.toUpperCase()}
              className="w-full h-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {GALLERY_VIEWS.map((view, idx) => (
              <button
                key={view.scene}
                type="button"
                onClick={() => setActiveGalleryIdx(idx)}
                aria-label={`View ${view.label}`}
                className={`border transition-colors overflow-hidden text-left ${
                  activeGalleryIdx === idx
                    ? 'border-[#101010] ring-1 ring-[#101010]'
                    : 'border-[#101010]/15 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="aspect-[4/3]">
                  <LuxuryArtwork
                    variant={fragrance.artwork}
                    scene={view.scene}
                    sizeLabel={selectedSize.toUpperCase()}
                    compact
                    className="w-full h-full"
                  />
                </div>
                <p className="px-2.5 py-2 text-[10px] uppercase tracking-[0.16em] bg-white text-[#101010] truncate">
                  {view.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-7 bg-[#FFFFFF] border border-[#101010]/10 p-7 sm:p-9">
          <div className="space-y-2 border-b border-[#101010]/10 pb-6">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#8E6F36]">
              <span>{fragrance.concentration}</span>
              <span>{fragrance.category}</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl tracking-[0.04em] text-[#101010]">
              {fragrance.name}
            </h1>
            <p className="text-sm text-[#292929]/75">{fragrance.subtitle}</p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-0.5 text-[#C6A66A]" aria-label={`Rated ${fragrance.rating} out of 5`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-3.5 h-3.5"
                    fill={star <= Math.round(fragrance.rating) ? '#C6A66A' : 'none'}
                  />
                ))}
              </div>
              <span className="text-xs text-[#292929]/70 tabular-nums">
                {fragrance.rating.toFixed(1)} · {localReviews.length + fragrance.reviewCount - fragrance.reviews.length} Client Reviews
              </span>
            </div>
          </div>

          {/* Price & Editorial Story */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-editorial tracking-[0.04em] text-[#101010] tabular-nums">
                {formatCurrency(unitPrice)}
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-[#292929]/65">
                {selectedSize} · Refillable Flacon
              </span>
            </div>
            <p className="text-sm text-[#292929]/85 leading-relaxed">
              {fragrance.editorialStory}
            </p>
          </div>

          {/* Size Selector */}
          <div className="space-y-2.5">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#101010] font-semibold">
              Select Bottle Volume
            </span>
            <div className="grid grid-cols-3 gap-3" role="group" aria-label="Select bottle size">
              {fragrance.sizes.map((size) => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-2 border text-center transition-colors ${
                      active
                        ? 'bg-[#101010] text-[#F7F4EE] border-[#101010]'
                        : 'bg-[#F7F4EE] text-[#101010] border-[#101010]/15 hover:border-[#101010]'
                    }`}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] tabular-nums">
                      {size}
                    </span>
                    <span
                      className={`block text-[11px] mt-0.5 tabular-nums ${
                        active ? 'text-[#C6A66A]' : 'text-[#292929]/70'
                      }`}
                    >
                      {formatCurrency(fragrance.prices[size])}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + Primary Purchase Controls */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#101010]/20 bg-[#F7F4EE] h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-full flex items-center justify-center hover:bg-[#E9E1D5] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-full flex items-center justify-center hover:bg-[#E9E1D5] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onAddToBag(fragrance, selectedSize, quantity)}
                className="flex-1 h-12 bg-[#101010] hover:bg-[#292929] text-[#F7F4EE] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag · {formatCurrency(unitPrice * quantity)}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(fragrance.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'bg-[#101010] border-[#101010] text-[#C6A66A]'
                    : 'border-[#101010]/20 text-[#101010] hover:border-[#101010]'
                }`}
              >
                <Heart className="w-4 h-4" fill={isWishlisted ? '#C6A66A' : 'none'} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => onBuyNow(fragrance, selectedSize, quantity)}
              className="w-full h-12 bg-[#C6A66A] hover:bg-[#D7B97E] text-[#101010] text-xs uppercase tracking-[0.22em] font-semibold transition-colors"
            >
              Buy Now — Express Checkout
            </button>
          </div>

          {/* Service Commitments */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#101010]/10 text-xs text-[#292929]/80">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#8E6F36] shrink-0 mt-0.5" />
              <span>Complimentary express shipping on orders over $200</span>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#8E6F36] shrink-0 mt-0.5" />
              <span>Includes 2 complimentary 2ml discovery vials</span>
            </div>
          </div>

          {/* Expandable Ingredients & Shipping */}
          <div className="divide-y divide-[#101010]/10">
            <div>
              <button
                type="button"
                aria-expanded={openAccordion === 'ingredients'}
                onClick={() =>
                  setOpenAccordion((prev) => (prev === 'ingredients' ? null : 'ingredients'))
                }
                className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-[0.18em] font-semibold"
              >
                Composition & Ingredients
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === 'ingredients' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'ingredients' && (
                <p className="pb-4 text-xs text-[#292929]/80 leading-relaxed">
                  {fragrance.ingredients}
                </p>
              )}
            </div>
            <div>
              <button
                type="button"
                aria-expanded={openAccordion === 'shipping'}
                onClick={() =>
                  setOpenAccordion((prev) => (prev === 'shipping' ? null : 'shipping'))
                }
                className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-[0.18em] font-semibold"
              >
                Shipping, Engraving & Returns
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === 'shipping' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'shipping' && (
                <p className="pb-4 text-xs text-[#292929]/80 leading-relaxed">
                  Orders placed before 15:00 CET depart our Paris atelier the same business day.
                  Unopened flacons may be returned within 30 days using the enclosed pre-paid
                  courier label. Test your included 2ml sample vial before breaking the seal.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OLFACTIVE PYRAMID & PERFORMANCE */}
      <section className="bg-[#101010] text-[#F7F4EE] py-20 border-y border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-12 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#C6A66A]">
              Olfactive Architecture
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl tracking-[0.05em] text-white">
              THE FRAGRANCE PYRAMID
            </h2>
            <p className="text-sm text-[#E9E1D5]/75">
              Fragrance Family: {fragrance.family}
              {fragrance.secondaryFamily ? ` · ${fragrance.secondaryFamily}` : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                tier: '01. Top Notes',
                timing: 'First Impression · 0–20 Min',
                notes: fragrance.topNotes,
              },
              {
                tier: '02. Heart Notes',
                timing: 'The Core Signature · 1–5 Hours',
                notes: fragrance.heartNotes,
              },
              {
                tier: '03. Base Notes',
                timing: 'Dry-Down Trail · 6–14 Hours',
                notes: fragrance.baseNotes,
              },
            ].map((stage) => (
              <div
                key={stage.tier}
                className="border border-white/15 bg-[#161514] p-7 space-y-4"
              >
                <div className="border-b border-white/10 pb-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A66A]">
                    {stage.tier}
                  </p>
                  <p className="text-xs text-[#E9E1D5]/60 mt-1">{stage.timing}</p>
                </div>
                <ul className="space-y-2.5">
                  {stage.notes.map((note) => (
                    <li
                      key={note}
                      className="font-editorial text-2xl tracking-[0.04em] text-white"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Longevity & Sillage Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-10">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em]">
                <span className="text-[#C6A66A]">Longevity</span>
                <span className="text-white tabular-nums">
                  {fragrance.longevity.label} · {fragrance.longevity.hours}
                </span>
              </div>
              <div className="h-1.5 bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#C6A66A]"
                  style={{ width: `${fragrance.longevity.score}%` }}
                />
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em]">
                <span className="text-[#C6A66A]">Sillage & Trail</span>
                <span className="text-white tabular-nums">{fragrance.sillage.label}</span>
              </div>
              <div className="h-1.5 bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#C6A66A]"
                  style={{ width: `${fragrance.sillage.score}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT IMPRESSIONS & REVIEWS */}
      <section className="bg-[#FFFFFF] py-20 border-b border-[#101010]/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8E6F36] font-semibold mb-2">
                Client Perspectives
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#101010]">
                SHARE YOUR IMPRESSION
              </h2>
            </div>

            {reviewSubmitted ? (
              <div className="p-5 border border-[#8E6F36]/40 bg-[#F7F4EE] text-sm text-[#101010]">
                Thank you. Your impression of {fragrance.name} has been added below.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} noValidate className="space-y-4 bg-[#F7F4EE] p-6 border border-[#101010]/10">
                <div>
                  <label htmlFor="review-author" className="block text-[11px] uppercase tracking-[0.16em] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="review-author"
                    type="text"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g., Claire D."
                    className="w-full bg-white border border-[#101010]/15 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                  />
                </div>
                <div>
                  <label htmlFor="review-rating" className="block text-[11px] uppercase tracking-[0.16em] mb-1.5">
                    Rating
                  </label>
                  <select
                    id="review-rating"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full bg-white border border-[#101010]/15 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                  >
                    <option value={5}>5 Stars — Extraordinary</option>
                    <option value={4}>4 Stars — Very Refined</option>
                    <option value={3}>3 Stars — Balanced</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="review-title" className="block text-[11px] uppercase tracking-[0.16em] mb-1.5">
                    Headline
                  </label>
                  <input
                    id="review-title"
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Summarize the scent on skin"
                    className="w-full bg-white border border-[#101010]/15 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                  />
                </div>
                <div>
                  <label htmlFor="review-comment" className="block text-[11px] uppercase tracking-[0.16em] mb-1.5">
                    Review
                  </label>
                  <textarea
                    id="review-comment"
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Notes, longevity, and occasion..."
                    className="w-full bg-white border border-[#101010]/15 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#101010]"
                  />
                </div>
                {reviewError && <p className="text-xs text-[#9E2A2B]">{reviewError}</p>}
                <button
                  type="submit"
                  className="bg-[#101010] hover:bg-[#C6A66A] text-white hover:text-[#101010] px-6 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-7 space-y-5">
            {localReviews.map((review) => (
              <article
                key={review.id}
                className="p-6 border border-[#101010]/10 bg-[#F7F4EE]/60 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-[#C6A66A]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5"
                        fill={s <= review.rating ? '#C6A66A' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#292929]/60">{review.date}</span>
                </div>
                <h3 className="font-editorial text-2xl text-[#101010]">{review.title}</h3>
                <p className="text-sm text-[#292929]/85 leading-relaxed">{review.comment}</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#292929]/65 pt-1">
                  {review.author} · {review.location}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED FRAGRANCES */}
      {related.length > 0 && (
        <section className="bg-[#F7F4EE] py-20">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
            <div className="mb-10">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8E6F36] font-semibold mb-2">
                Curated Pairings
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#101010]">
                YOU MAY ALSO APPRECIATE
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  fragrance={item}
                  isWishlisted={wishlistIds.includes(item.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  onAddToBag={onAddToBag}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Mobile Purchase Bar (respecting <=15% viewport height) */}
      <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-[#101010] text-[#F7F4EE] border-t border-white/15 px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-editorial text-lg text-white truncate">{fragrance.name}</p>
          <p className="text-xs text-[#C6A66A] tabular-nums">
            {selectedSize} · {formatCurrency(unitPrice)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onAddToBag(fragrance, selectedSize, quantity)}
          className="bg-[#C6A66A] text-[#101010] px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-semibold shrink-0"
        >
          Add to Bag
        </button>
      </div>
    </main>
  );
};
