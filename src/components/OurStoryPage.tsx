import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageView } from '../types/fragrance';
import { LuxuryArtwork } from './LuxuryArtwork';

interface OurStoryPageProps {
  onNavigate: (view: PageView) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  return (
    <main className="bg-[#F7F4EE] text-[#101010]">
      <section className="bg-[#101010] text-[#F7F4EE] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#C6A66A]">
              Maison NOIRA · Est. Paris
            </p>
            <h1 className="font-editorial text-4xl sm:text-6xl tracking-[0.04em] leading-[1.08] text-white text-balance">
              THE ARCHITECTURE OF INVISIBLE COUTURE
            </h1>
            <p className="text-base text-[#E9E1D5]/80 leading-relaxed max-w-xl">
              Born between the stone workshops of Place Vendôme and the sunlit fields of Grasse,
              NOIRA composes Extraits de Parfum with the discipline of tailored silhouette and the
              intimacy of memory.
            </p>
          </div>
          <div className="lg:col-span-6 aspect-[4/3] border border-[#C6A66A]/30 overflow-hidden">
            <LuxuryArtwork variant="blanc-absolu" scene="atelier" className="w-full h-full" />
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-20 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-[#101010]/10">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8E6F36] font-semibold">
            01. Raw Harvests
          </p>
          <h2 className="font-editorial text-3xl text-[#101010]">Uncompromised Origins</h2>
          <p className="text-sm text-[#292929]/80 leading-relaxed">
            We partner directly with third-generation growers in Grasse for Centifolia rose,
            Calabria for cold-pressed green bergamot, and Florence for three-year-aged iris
            rhizomes.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8E6F36] font-semibold">
            02. Slow Maceration
          </p>
          <h2 className="font-editorial text-3xl text-[#101010]">Patience in Oak</h2>
          <p className="text-sm text-[#292929]/80 leading-relaxed">
            Our Reserve Privée creations rest for up to six months in small charred oak casks,
            softening sharp volatile edges into a unified, long-wearing velvet trail.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8E6F36] font-semibold">
            03. Permanent Glass
          </p>
          <h2 className="font-editorial text-3xl text-[#101010]">Refillable Flacons</h2>
          <p className="text-sm text-[#292929]/80 leading-relaxed">
            Every NOIRA bottle is forged from heavyweight French crystal with precision screw-neck
            atomizers designed for infinite refilling at our Rue Saint-Honoré salon.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#101010]">
          EXPERIENCE THE SIGNATURE REPERTOIRE
        </h2>
        <p className="text-base text-[#292929]/80 max-w-xl mx-auto">
          Every full-size flacon includes two complimentary 2ml discovery vials so you can wear the
          fragrance on skin before opening your sealed presentation box.
        </p>
        <button
          type="button"
          onClick={() => onNavigate({ name: 'collection' })}
          className="bg-[#101010] hover:bg-[#C6A66A] text-[#F7F4EE] hover:text-[#101010] px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold inline-flex items-center gap-2 transition-colors"
        >
          Explore All Fragrances
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </main>
  );
};
