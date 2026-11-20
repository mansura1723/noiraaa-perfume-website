import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import {
  COLLECTIONS,
  FRAGRANCES,
  FRAGRANCE_FAMILIES,
  GIFT_COFFRETS,
} from '../data/fragrances';
import {
  BottleSize,
  Fragrance,
  FragranceFamily,
  PageView,
  QuizAnswers,
} from '../types/fragrance';
import {
  formatCurrency,
  recommendFromQuiz,
  validateNewsletterEmail,
} from '../utils/catalog';
import { LuxuryArtwork } from './LuxuryArtwork';
import { ProductCard } from './ProductCard';

interface HomePageProps {
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (fragrance: Fragrance) => void;
  onAddToBag: (fragrance: Fragrance, size: BottleSize, quantity: number) => void;
  onNavigate: (view: PageView) => void;
  onSelectFamilyFilter: (family: FragranceFamily) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToBag,
  onNavigate,
  onSelectFamilyFilter,
}) => {
  const [activeFamily, setActiveFamily] = useState<FragranceFamily>('Oriental');
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    mood: null,
    occasion: null,
    preferredFamily: null,
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const bestsellers = FRAGRANCES.slice(0, 6);
  const familyMatches = FRAGRANCES.filter(
    (f) => f.family === activeFamily || f.secondaryFamily === activeFamily
  );
  const activeFamilyMeta = FRAGRANCE_FAMILIES.find((item) => item.family === activeFamily)!;

  const quizComplete = Boolean(
    quizAnswers.mood && quizAnswers.occasion && quizAnswers.preferredFamily
  );
  const quizRecommendations = quizComplete
    ? recommendFromQuiz(FRAGRANCES, quizAnswers)
    : [];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateNewsletterEmail(newsletterEmail);
    if (!check.valid) {
      setNewsletterError(check.error ?? 'Please enter a valid email.');
      return;
    }
    setNewsletterError(null);
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <main id="top">
      {/* C. CINEMATIC HERO SECTION */}
      <section className="relative bg-[#101010] text-[#F7F4EE] overflow-hidden border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-10 sm:py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:min-h-[calc(100vh-104px)]">
          <div className="lg:col-span-6 space-y-7 z-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#C6A66A]">
              Maison de Haute Parfumerie · Paris
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl xl:text-[64px] leading-[1.06] tracking-[0.04em] text-white text-balance">
              THE ART OF AN UNFORGETTABLE PRESENCE
            </h1>
            <p className="text-base sm:text-lg text-[#E9E1D5]/80 max-w-xl leading-relaxed">
              Discover extraordinary fragrances crafted for those who leave a lasting impression.
              Macerated in Paris with rare botanical absolutes and aged woods.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate({ name: 'collection' })}
                className="bg-[#C6A66A] hover:bg-[#D7B97E] text-[#101010] px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors whitespace-nowrap"
              >
                Explore Collection
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ name: 'story' })}
                className="border border-white/30 hover:border-[#C6A66A] text-[#F7F4EE] hover:text-[#C6A66A] px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors whitespace-nowrap"
              >
                Discover Our World
              </button>
            </div>
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-8 text-xs text-[#E9E1D5]/70">
              <div>
                <span className="block text-[#C6A66A] uppercase tracking-[0.18em] mb-1">
                  Concentration
                </span>
                Up to 30% Extrait
              </div>
              <div>
                <span className="block text-[#C6A66A] uppercase tracking-[0.18em] mb-1">
                  Harvest Origin
                </span>
                Grasse & Laotian Reserve
              </div>
              <div>
                <span className="block text-[#C6A66A] uppercase tracking-[0.18em] mb-1">
                  Presentation
                </span>
                Refillable Architectural Glass
              </div>
            </div>
          </div>

          {/* Hero Visual Centerpiece */}
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-[#D9C08C] via-[#C6A66A] to-[#9E7E45] p-3 sm:p-4 border border-[#DFC48D]/40 shadow-2xl">
              <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/4.6] max-h-[600px] w-full border border-[#101010]/30 overflow-hidden bg-[#101010]">
                <LuxuryArtwork
                  variant="noir-eternel"
                  scene="hero"
                  sizeLabel="100 ML"
                  className="w-full h-full"
                />
                <div className="absolute bottom-0 inset-x-0 flex items-end justify-between border-t border-white/15 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 py-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#C6A66A]">
                      Signature Icon
                    </p>
                    <p className="font-editorial text-2xl tracking-[0.1em] text-white">
                      NOIR ÉTERNEL
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate({ name: 'product', productId: 'noir-eternel' })}
                    className="text-xs uppercase tracking-[0.18em] text-[#F7F4EE] hover:text-[#C6A66A] inline-flex items-center gap-1.5 whitespace-nowrap"
                  >
                    View Flacon
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. BRAND INTRODUCTION */}
      <section className="bg-[#F7F4EE] text-[#101010] py-20 lg:py-24 border-b border-[#101010]/10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#8E6F36] font-semibold">
            L’Esprit de la Maison
          </p>
          <h2 className="font-editorial text-3xl sm:text-5xl tracking-[0.04em] leading-[1.12] text-[#101010] text-balance">
            BEYOND FRAGRANCE. AN EXPRESSION OF IDENTITY.
          </h2>
          <p className="text-base sm:text-lg text-[#292929]/80 leading-relaxed max-w-2xl mx-auto">
            At NOIRA, perfumery is treated as quiet architecture. Each composition is built around
            chiaroscuro—the tension between luminous Mediterranean citrus, velvet petals harvested at
            dawn, and dark resinous woods aged in charred oak.
          </p>
        </div>
      </section>

      {/* E. FOUR FEATURED COLLECTIONS */}
      <section className="bg-[#FFFFFF] py-20 lg:py-24 border-b border-[#101010]/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8E6F36] font-semibold mb-2">
                Curated Chapters
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl tracking-[0.05em] text-[#101010]">
                THE HOUSE COLLECTIONS
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ name: 'collection' })}
              className="text-xs uppercase tracking-[0.2em] text-[#101010] hover:text-[#8E6F36] inline-flex items-center gap-2 border-b border-[#101010] pb-1 self-start sm:self-auto"
            >
              View All Fragrances
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COLLECTIONS.map((col) => {
              const featured = FRAGRANCES.find((f) => f.id === col.featuredProductId)!;
              return (
                <div
                  key={col.slug}
                  className={`group grid grid-cols-1 sm:grid-cols-12 border ${
                    col.theme === 'dark'
                      ? 'bg-[#101010] text-[#F7F4EE] border-[#101010]'
                      : 'bg-[#F7F4EE] text-[#101010] border-[#101010]/15'
                  }`}
                >
                  <div className="sm:col-span-5 aspect-[4/5] sm:aspect-auto overflow-hidden">
                    <LuxuryArtwork
                      variant={featured.artwork}
                      className="w-full h-full min-h-[260px] group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="sm:col-span-7 p-7 sm:p-8 flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#C6A66A]">
                        {col.kicker}
                      </p>
                      <h3 className="font-editorial text-2xl sm:text-3xl tracking-[0.05em] leading-snug">
                        {col.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          col.theme === 'dark' ? 'text-[#E9E1D5]/80' : 'text-[#292929]/80'
                        }`}
                      >
                        {col.description}
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => onNavigate({ name: 'collection', collection: col.slug })}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.18em] border transition-colors ${
                          col.theme === 'dark'
                            ? 'border-[#C6A66A]/60 text-[#F7F4EE] hover:bg-[#C6A66A] hover:text-[#101010]'
                            : 'border-[#101010] text-[#101010] hover:bg-[#101010] hover:text-[#F7F4EE]'
                        }`}
                      >
                        Explore Collection
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* F. BESTSELLING FRAGRANCES */}
      <section className="bg-[#F7F4EE] py-20 lg:py-24 border-b border-[#101010]/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8E6F36] font-semibold mb-2">
                Sillage Icons
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl tracking-[0.05em] text-[#101010]">
                BESTSELLING FRAGRANCES
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ name: 'collection' })}
              className="text-xs uppercase tracking-[0.2em] text-[#101010] hover:text-[#8E6F36] inline-flex items-center gap-2 border-b border-[#101010] pb-1 self-start sm:self-auto"
            >
              Shop Full Catalogue
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {bestsellers.map((fragrance) => (
              <ProductCard
                key={fragrance.id}
                fragrance={fragrance}
                isWishlisted={wishlistIds.includes(fragrance.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToBag={onAddToBag}
                onSelectProduct={(productId) => onNavigate({ name: 'product', productId })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* G. BRAND CAMPAIGN SECTION */}
      <section className="bg-[#101010] py-14 lg:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border border-[#C6A66A]/20 overflow-hidden">
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] lg:min-h-[520px] overflow-hidden">
              <LuxuryArtwork
                variant="golden-ember"
                scene="campaign"
                sizeLabel="100 ML"
                className="w-full h-full"
              />
            </div>
            <div className="lg:col-span-5 px-8 py-12 sm:p-14 flex flex-col justify-center space-y-6 bg-[#F7F4EE] text-[#101010]">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#8E6F36] font-semibold">
                Autumn · Winter Campaign
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl tracking-[0.03em] leading-[1.08] text-[#101010] text-balance">
                SCENT IS THE SIGNATURE THAT REMAINS.
              </h2>
              <p className="text-sm sm:text-base text-[#292929]/80 leading-relaxed">
                Before a word is spoken, and long after a room grows quiet, fragrance traces your
                presence in memory. Discover GOLDEN EMBER—our oak-aged Reserve Privée.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'product', productId: 'golden-ember' })}
                  className="bg-[#101010] hover:bg-[#C6A66A] text-[#F7F4EE] hover:text-[#101010] px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Discover Golden Ember
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H. DISCOVER YOUR FRAGRANCE (INTERACTIVE EXPLORER + QUIZ) */}
      <section className="bg-[#FFFFFF] text-[#101010] py-20 lg:py-24 border-b border-[#101010]/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8E6F36] font-semibold mb-2">
                Olfactive Discovery
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl tracking-[0.05em] text-[#101010]">
                DISCOVER YOUR FRAGRANCE
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setQuizOpen((prev) => !prev)}
              className="border border-[#101010] bg-[#101010] text-[#F7F4EE] hover:bg-[#C6A66A] hover:text-[#101010] hover:border-[#C6A66A] px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium inline-flex items-center gap-2 transition-colors self-start"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {quizOpen ? 'Close Fragrance Consultation' : 'Take Fragrance Quiz'}
            </button>
          </div>

          {/* Interactive 7-Family Filter Tabs */}
          <div
            className="flex flex-wrap gap-2 pb-8 border-b border-[#101010]/10"
            role="tablist"
            aria-label="Explore fragrances by olfactive family"
          >
            {FRAGRANCE_FAMILIES.map((item) => {
              const active = activeFamily === item.family;
              return (
                <button
                  key={item.family}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFamily(item.family)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] border transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#101010] text-[#F7F4EE] border-[#101010]'
                      : 'bg-[#F7F4EE] text-[#101010] border-[#101010]/15 hover:border-[#101010]'
                  }`}
                >
                  {item.family}
                </button>
              );
            })}
          </div>

          {/* Selected Family Showcase */}
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-[#F7F4EE] p-7 border border-[#101010]/10 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8E6F36]">
                {activeFamily} Family
              </p>
              <h3 className="font-editorial text-3xl text-[#101010]">
                {activeFamilyMeta.subtitle}
              </h3>
              <p className="text-sm text-[#292929]/80 leading-relaxed">
                Key accords: {activeFamilyMeta.notesPreview}.
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-[#292929]/70">
                Character · {activeFamilyMeta.atmosphere}
              </p>
              <button
                type="button"
                onClick={() => onSelectFamilyFilter(activeFamily)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#101010] hover:text-[#8E6F36] border-b border-[#101010] pb-1 pt-2"
              >
                Filter All {activeFamily} Scents
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {familyMatches.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 p-4 bg-[#FFFFFF] border border-[#101010]/10 items-center"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate({ name: 'product', productId: item.id })}
                    className="w-24 sm:w-28 aspect-[4/5] shrink-0 overflow-hidden bg-[#F7F4EE]"
                  >
                    <LuxuryArtwork variant={item.artwork} compact className="w-full h-full" />
                  </button>
                  <div className="space-y-2 min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8E6F36]">
                      {item.concentration}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigate({ name: 'product', productId: item.id })}
                      className="font-editorial text-2xl tracking-[0.06em] text-[#101010] hover:text-[#8E6F36] text-left block"
                    >
                      {item.name}
                    </button>
                    <p className="text-xs text-[#292929]/75 line-clamp-2">
                      {item.shortDescription}
                    </p>
                    <div className="pt-1 flex items-center gap-4">
                      <span className="text-sm font-semibold tabular-nums">
                        {formatCurrency(item.prices['50ml'])}
                      </span>
                      <button
                        type="button"
                        onClick={() => onAddToBag(item, '50ml', 1)}
                        className="text-[11px] uppercase tracking-[0.16em] text-[#101010] hover:text-[#8E6F36] border-b border-[#101010]"
                      >
                        Add 50ml
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Fragrance Consultation Quiz */}
          {quizOpen && (
            <div className="mt-10 bg-[#101010] text-[#F7F4EE] p-7 sm:p-10 border border-[#C6A66A]/35 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#C6A66A]">
                    Private Perfumer Consultation
                  </p>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-white mt-1">
                    Curate Your Signature Accord
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setQuizAnswers({ mood: null, occasion: null, preferredFamily: null })
                  }
                  className="text-xs uppercase tracking-[0.16em] text-[#E9E1D5]/70 hover:text-white self-start sm:self-auto"
                >
                  Reset Consultation
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#C6A66A]">
                    01. Desired Aura
                  </p>
                  <div className="space-y-2">
                    {(
                      [
                        'Nocturnal & Magnetic',
                        'Radiant & Velvety',
                        'Crisp & Architectural',
                        'Warm & Resinous',
                      ] as const
                    ).map((mood) => (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, mood }))}
                        className={`w-full text-left px-4 py-2.5 text-xs border transition-colors ${
                          quizAnswers.mood === mood
                            ? 'bg-[#C6A66A] text-[#101010] border-[#C6A66A] font-semibold'
                            : 'border-white/15 text-[#F7F4EE] hover:border-[#C6A66A]'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#C6A66A]">
                    02. Primary Occasion
                  </p>
                  <div className="space-y-2">
                    {(
                      ['Evening Gala', 'Daily Signature', 'Intimate & Personal'] as const
                    ).map((occasion) => (
                      <button
                        key={occasion}
                        type="button"
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, occasion }))}
                        className={`w-full text-left px-4 py-2.5 text-xs border transition-colors ${
                          quizAnswers.occasion === occasion
                            ? 'bg-[#C6A66A] text-[#101010] border-[#C6A66A] font-semibold'
                            : 'border-white/15 text-[#F7F4EE] hover:border-[#C6A66A]'
                        }`}
                      >
                        {occasion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#C6A66A]">
                    03. Olfactive Attraction
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {FRAGRANCE_FAMILIES.map((f) => (
                      <button
                        key={f.family}
                        type="button"
                        onClick={() =>
                          setQuizAnswers((prev) => ({ ...prev, preferredFamily: f.family }))
                        }
                        className={`text-left px-3 py-2 text-xs border transition-colors ${
                          quizAnswers.preferredFamily === f.family
                            ? 'bg-[#C6A66A] text-[#101010] border-[#C6A66A] font-semibold'
                            : 'border-white/15 text-[#F7F4EE] hover:border-[#C6A66A]'
                        }`}
                      >
                        {f.family}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {quizComplete ? (
                <div className="pt-6 border-t border-white/15 space-y-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C6A66A]">
                    Your Curated NOIRA Matches
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {quizRecommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="bg-[#181716] border border-white/15 p-4 flex flex-col justify-between gap-4"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="w-16 aspect-[4/5] shrink-0 overflow-hidden">
                            <LuxuryArtwork variant={rec.artwork} compact className="w-full h-full" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-[#C6A66A]">
                              {rec.family}
                            </p>
                            <h4 className="font-editorial text-xl text-white">{rec.name}</h4>
                            <p className="text-xs text-[#E9E1D5]/70 tabular-nums">
                              50ml · {formatCurrency(rec.prices['50ml'])}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => onNavigate({ name: 'product', productId: rec.id })}
                            className="flex-1 py-2 border border-white/25 text-[11px] uppercase tracking-[0.16em] hover:border-[#C6A66A]"
                          >
                            Explore
                          </button>
                          <button
                            type="button"
                            onClick={() => onAddToBag(rec, '50ml', 1)}
                            className="flex-1 py-2 bg-[#C6A66A] text-[#101010] text-[11px] uppercase tracking-[0.16em] font-semibold"
                          >
                            Add 50ml
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#E9E1D5]/65 pt-2">
                  Select your aura, occasion, and olfactive family above to reveal your personalized trio.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* I. EXCLUSIVE GIFT COLLECTION */}
      <section className="bg-[#E9E1D5]/45 text-[#101010] py-20 lg:py-24 border-b border-[#101010]/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8E6F36] font-semibold mb-2">
                L’Art d’Offrir
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl tracking-[0.05em] text-[#101010]">
                EXCLUSIVE GIFT COLLECTION
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ name: 'collection', giftsOnly: true })}
              className="text-xs uppercase tracking-[0.2em] text-[#101010] hover:text-[#8E6F36] inline-flex items-center gap-2 border-b border-[#101010] pb-1 self-start sm:self-auto"
            >
              Explore All Gift Coffrets
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GIFT_COFFRETS.map((gift) => {
              const linkedFragrance = FRAGRANCES.find((f) => f.id === gift.linkedProductId)!;
              return (
                <div
                  key={gift.id}
                  className="bg-[#FFFFFF] border border-[#101010]/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] overflow-hidden">
                      <LuxuryArtwork
                        variant={gift.artwork}
                        scene="coffret"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-6 space-y-2.5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8E6F36]">
                        {gift.contents}
                      </p>
                      <h3 className="font-editorial text-2xl tracking-[0.05em] text-[#101010]">
                        {gift.name}
                      </h3>
                      <p className="text-xs text-[#292929]/80 leading-relaxed">
                        {gift.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-3 border-t border-[#101010]/10 flex items-center justify-between">
                    <span className="text-base font-semibold tabular-nums">
                      {formatCurrency(gift.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onAddToBag(linkedFragrance, '50ml', 1)}
                      className="bg-[#101010] hover:bg-[#C6A66A] text-[#F7F4EE] hover:text-[#101010] px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] font-medium transition-colors"
                    >
                      Add Coffret
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* J. BRAND PHILOSOPHY */}
      <section className="bg-[#F7F4EE] text-[#101010] py-20 lg:py-24 border-b border-[#101010]/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 aspect-[4/3] overflow-hidden border border-[#101010]/15">
            <LuxuryArtwork
              variant="blanc-absolu"
              scene="atelier"
              className="w-full h-full"
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#8E6F36] font-semibold">
              Atelier Philosophy
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl tracking-[0.04em] leading-tight text-[#101010]">
              CRAFTED WITHOUT HASTE IN GRASSE & PARIS
            </h2>
            <p className="text-base text-[#292929]/85 leading-relaxed">
              Every NOIRA formulation matures for at least twelve weeks before filtration, allowing
              rare iris butter, hand-picked Grasse rose, and resinous labdanum to marry into a
              single unbroken chord. We bottle exclusively in heavy-base, refillable French glass.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#101010]/10">
              <div>
                <p className="font-editorial text-3xl text-[#101010] tabular-nums">12 Wks</p>
                <p className="text-xs text-[#292929]/70 mt-1">Minimum Cold Maceration</p>
              </div>
              <div>
                <p className="font-editorial text-3xl text-[#101010] tabular-nums">28%</p>
                <p className="text-xs text-[#292929]/70 mt-1">Extrait Oil Concentration</p>
              </div>
              <div>
                <p className="font-editorial text-3xl text-[#101010] tabular-nums">100%</p>
                <p className="text-xs text-[#292929]/70 mt-1">Cruelty-Free & Refillable</p>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate({ name: 'story' })}
                className="border border-[#101010] hover:bg-[#101010] hover:text-[#F7F4EE] text-[#101010] px-6 py-3 text-xs uppercase tracking-[0.18em] transition-colors inline-flex items-center gap-2"
              >
                Read Our Heritage
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* K. NEWSLETTER SECTION */}
      <section className="bg-[#181716] text-[#F7F4EE] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#C6A66A]">
            The Private Circle
          </p>
          <h2 className="font-editorial text-3xl sm:text-5xl tracking-[0.05em] text-white text-balance">
            ENTER OUR WORLD OF EXCLUSIVITY
          </h2>
          <p className="text-sm sm:text-base text-[#E9E1D5]/75 leading-relaxed">
            Enjoy early access to numbered Reserve Privée releases, seasonal discovery coffrets, and
            bespoke engraving privileges.
          </p>

          {newsletterSuccess ? (
            <div className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#C6A66A]/60 text-[#C6A66A] text-xs uppercase tracking-[0.18em]">
              <Check className="w-4 h-4" />
              Welcome to the NOIRA Private Circle
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              noValidate
              className="max-w-md mx-auto pt-2 space-y-2"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="home-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="home-newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterError) setNewsletterError(null);
                  }}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent border border-white/25 focus:border-[#C6A66A] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#C6A66A] hover:bg-[#D7B97E] text-[#101010] px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              {newsletterError && (
                <p className="text-xs text-[#E5988B] text-left">{newsletterError}</p>
              )}
            </form>
          )}
        </div>
      </section>
    </main>
  );
};
