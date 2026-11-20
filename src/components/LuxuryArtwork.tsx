import React from 'react';
import { ArtworkVariant } from '../types/fragrance';

export type ArtworkScene =
  | 'flacon'
  | 'detail'
  | 'packaging'
  | 'hero'
  | 'campaign'
  | 'coffret'
  | 'atelier';

interface LuxuryArtworkProps {
  variant: ArtworkVariant;
  scene?: ArtworkScene;
  className?: string;
  sizeLabel?: string;
  compact?: boolean;
}

const FRAGRANCE_LABELS: Record<ArtworkVariant, string> = {
  'noir-eternel': 'NOIR ÉTERNEL — Extrait de Parfum flacon on obsidian slate',
  'velvet-rose': 'VELVET ROSE — Eau de Parfum Intense flacon on travertine stone',
  'midnight-oud': 'MIDNIGHT OUD — Extrait de Parfum flacon on black volcanic basalt',
  'blanc-absolu': 'BLANC ABSOLU — Eau de Parfum crystal flacon on limestone plinth',
  'golden-ember': 'GOLDEN EMBER — Réserve Privée amber flacon with gold collar',
  'rose-imperiale': 'ROSE IMPÉRIALE — Eau de Parfum petal-tinted flacon on natural stone',
  'ambre-fume': 'AMBRE FUMÉ — Réserve Privée smoked obsidian flacon on basalt',
  'cedre-solaire': 'CÈDRE SOLAIRE — Eau de Parfum sunlit citrine flacon on travertine',
};

const DETAIL_SRC: Record<ArtworkVariant, string> = {
  'noir-eternel': '/assets/noira/detail-gold-collar.jpg',
  'golden-ember': '/assets/noira/detail-gold-collar.jpg',
  'midnight-oud': '/assets/noira/detail-basalt-plinth.jpg',
  'ambre-fume': '/assets/noira/detail-basalt-plinth.jpg',
  'velvet-rose': '/assets/noira/detail-travertine-crystal.jpg',
  'blanc-absolu': '/assets/noira/detail-travertine-crystal.jpg',
  'rose-imperiale': '/assets/noira/detail-travertine-crystal.jpg',
  'cedre-solaire': '/assets/noira/detail-travertine-crystal.jpg',
};

const DARK_VARIANTS = new Set<ArtworkVariant>([
  'noir-eternel',
  'midnight-oud',
  'golden-ember',
  'ambre-fume',
]);

function resolveImageSource(variant: ArtworkVariant, scene: ArtworkScene): {
  src: string;
  alt: string;
  objectPosition: string;
} {
  if (scene === 'campaign') {
    return {
      src: '/assets/noira/campaign-editorial.jpg',
      alt: 'NOIRA editorial luxury fragrance campaign at golden hour in Paris',
      objectPosition: 'object-[38%_35%]',
    };
  }

  if (scene === 'atelier') {
    return {
      src: '/assets/noira/atelier-still-life.jpg',
      alt: 'NOIRA glass flacon resting on a black veined marble tray beside blush peonies',
      objectPosition: 'object-center',
    };
  }

  if (scene === 'coffret') {
    const coffretMap: Partial<Record<ArtworkVariant, string>> = {
      'noir-eternel': '/assets/noira/coffret-noir-eternel.jpg',
      'golden-ember': '/assets/noira/coffret-golden-ember.jpg',
      'velvet-rose': '/assets/noira/coffret-velvet-rose.jpg',
    };
    return {
      src: coffretMap[variant] ?? '/assets/noira/coffret-noir-eternel.jpg',
      alt: `NOIRA ${FRAGRANCE_LABELS[variant]} luxury gift coffret`,
      objectPosition: 'object-center',
    };
  }

  if (scene === 'packaging') {
    return {
      src: DARK_VARIANTS.has(variant)
        ? '/assets/noira/packaging-dark.jpg'
        : '/assets/noira/packaging-light.jpg',
      alt: `NOIRA couture presentation box and flacon for ${variant}`,
      objectPosition: 'object-center',
    };
  }

  if (scene === 'detail') {
    return {
      src: DETAIL_SRC[variant],
      alt: `Architectural craftsmanship close-up for ${FRAGRANCE_LABELS[variant]}`,
      objectPosition: 'object-center',
    };
  }

  return {
    src: `/assets/noira/${variant}.jpg`,
    alt: FRAGRANCE_LABELS[variant],
    objectPosition: scene === 'hero' ? 'object-[50%_38%]' : 'object-[50%_44%]',
  };
}

export const LuxuryArtwork: React.FC<LuxuryArtworkProps> = ({
  variant,
  scene = 'flacon',
  className = '',
  compact = false,
}) => {
  const { src, alt, objectPosition } = resolveImageSource(variant, scene);

  return (
    <div
      className={`relative overflow-hidden select-none bg-[#141312] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
        className={`w-full h-full object-cover ${objectPosition} block`}
      />
      {!compact && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10"
        />
      )}
    </div>
  );
};
