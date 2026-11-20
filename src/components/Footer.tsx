import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CollectionSlug, GenderCategory, PageView } from '../types/fragrance';
import { validateNewsletterEmail } from '../utils/catalog';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAccount }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateNewsletterEmail(email);
    if (!res.valid) {
      setError(res.error ?? 'Invalid email');
      return;
    }
    setError(null);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#101010] text-[#F7F4EE] border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <button
              type="button"
              onClick={() => onNavigate({ name: 'home' })}
              className="font-editorial text-3xl tracking-[0.3em] text-white"
            >
              NOIRA
            </button>
            <p className="text-sm text-[#E9E1D5]/75 leading-relaxed max-w-sm">
              Maison de Haute Parfumerie founded in Paris. Every flacon is macerated in small batches
              using Grasse floral absolutes and rare aged woods.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C6A66A]">
              24 Rue Saint-Honoré · 75001 Paris
            </p>
          </div>

          {/* Shop Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A66A] font-sans font-semibold">
              Fragrances
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E9E1D5]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'collection' })}
                  className="hover:text-white transition-colors"
                >
                  All Fragrances
                </button>
              </li>
              {(['feminine', 'masculine', 'signature', 'exclusive'] as CollectionSlug[]).map((slug) => (
                <li key={slug}>
                  <button
                    type="button"
                    onClick={() => onNavigate({ name: 'collection', collection: slug })}
                    className="hover:text-white transition-colors"
                  >
                    {slug.charAt(0).toUpperCase() + slug.slice(1)} Collection
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'collection', giftsOnly: true })}
                  className="hover:text-white transition-colors"
                >
                  Gift Coffrets
                </button>
              </li>
            </ul>
          </div>

          {/* Maison & Service */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A66A] font-sans font-semibold">
              Client Concierge
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E9E1D5]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'story' })}
                  className="hover:text-white transition-colors"
                >
                  Our Story & Atelier
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'collection', category: 'Feminine' as GenderCategory })}
                  className="hover:text-white transition-colors"
                >
                  Fragrances For Her
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'collection', category: 'Masculine' as GenderCategory })}
                  className="hover:text-white transition-colors"
                >
                  Fragrances For Him
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAccount}
                  className="hover:text-white transition-colors"
                >
                  Order History & Account
                </button>
              </li>
              <li className="text-[#E9E1D5]/60">Complimentary Delivery Over $200 · 30-Day Returns</li>
            </ul>
          </div>

          {/* Footer Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A66A] font-sans font-semibold">
              Private Dispatch
            </h3>
            <p className="text-sm text-[#E9E1D5]/75 leading-relaxed">
              Receive private invitations to Reserve Privée harvests and Parisian salon previews.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#C6A66A] py-2 border-b border-[#C6A66A]/40">
                <Check className="w-4 h-4 shrink-0" />
                <span>You are enrolled in the NOIRA Private Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="space-y-2">
                <div className="flex border-b border-white/25 focus-within:border-[#C6A66A] transition-colors">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter your email"
                    className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="px-2 text-[#C6A66A] hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-xs text-[#E5988B]">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Social Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#E9E1D5]/55">
          <p>© 2026 NOIRA Maison de Parfumerie. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate({ name: 'story' })}
              className="hover:text-[#F7F4EE] transition-colors"
            >
              Shipping & Returns
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ name: 'story' })}
              className="hover:text-[#F7F4EE] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ name: 'story' })}
              className="hover:text-[#F7F4EE] transition-colors"
            >
              Terms & Conditions
            </button>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#C6A66A] hover:text-white transition-colors uppercase tracking-[0.16em]"
            >
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
