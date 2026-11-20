import { CollectionMeta, Fragrance, FragranceFamily } from '../types/fragrance';

export const COLLECTIONS: CollectionMeta[] = [
  {
    slug: 'feminine',
    title: 'THE FEMININE COLLECTION',
    kicker: '01. Floral & Silk Accord',
    description:
      'Luminous white petals, velvet damask rose, and powdery iris sculpted for effortless Parisian grace.',
    featuredProductId: 'velvet-rose',
    theme: 'light',
  },
  {
    slug: 'masculine',
    title: 'THE MASCULINE COLLECTION',
    kicker: '02. Woods & Smoked Resin',
    description:
      'Architectural cedarwood, blackened vetiver, and rare Laotian oud tempered with cold mineral spice.',
    featuredProductId: 'midnight-oud',
    theme: 'dark',
  },
  {
    slug: 'signature',
    title: 'THE SIGNATURE COLLECTION',
    kicker: '03. The House Icons',
    description:
      'Our foundational Extrait de Parfum creations—bold, unisex compositions defined by enduring clarity.',
    featuredProductId: 'noir-eternel',
    theme: 'dark',
  },
  {
    slug: 'exclusive',
    title: 'THE EXCLUSIVE COLLECTION',
    kicker: '04. Small-Batch Reserve',
    description:
      'Numbered private-reserve flacons macerated in oak for six months using Grasse absolute harvests.',
    featuredProductId: 'golden-ember',
    theme: 'light',
  },
];

export const FRAGRANCE_FAMILIES: {
  family: FragranceFamily;
  subtitle: string;
  notesPreview: string;
  atmosphere: string;
}[] = [
  {
    family: 'Floral',
    subtitle: 'Velvet Petals & Iris',
    notesPreview: 'Damask Rose · Florentine Iris · White Peony',
    atmosphere: 'Romantic, sculpted, luminous',
  },
  {
    family: 'Woody',
    subtitle: 'Cedar, Vetiver & Oud',
    notesPreview: 'Atlas Cedar · Haitian Vetiver · Smoked Oud',
    atmosphere: 'Architectural, grounded, magnetic',
  },
  {
    family: 'Oriental',
    subtitle: 'Spiced Incense & Musk',
    notesPreview: 'Black Saffron · Frankincense · Dark Myrrh',
    atmosphere: 'Opulent, nocturnal, enveloping',
  },
  {
    family: 'Fresh',
    subtitle: 'Crisp Mineral & Tea',
    notesPreview: 'White Tea · Violet Leaf · Rain-Washed Stone',
    atmosphere: 'Pure, airy, effortless',
  },
  {
    family: 'Citrus',
    subtitle: 'Calabrian Bergamot & Neroli',
    notesPreview: 'Green Bergamot · Bitter Orange · Petitgrain',
    atmosphere: 'Radiant, sunlit, refined',
  },
  {
    family: 'Amber',
    subtitle: 'Labdanum & Warm Resin',
    notesPreview: 'Golden Amber · Benzoin Tears · Smoked Vanilla',
    atmosphere: 'Sensual, glowing, enduring',
  },
  {
    family: 'Gourmand',
    subtitle: 'Roasted Tonka & Praline',
    notesPreview: 'Madagascar Vanilla · Roasted Tonka · Cocoa Husk',
    atmosphere: 'Intimate, velvet-smooth, addictive',
  },
];

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'noir-eternel',
    slug: 'noir-eternel',
    name: 'NOIR ÉTERNEL',
    subtitle: 'Extrait de Parfum · Oriental Woods',
    family: 'Oriental',
    secondaryFamily: 'Woody',
    category: 'Unisex',
    collection: 'signature',
    badge: 'Bestseller',
    shortDescription:
      'Black saffron and roasted cardamom draped over smoked cedarwood and warm nocturnal amber.',
    editorialStory:
      'Composed for the quiet hour after midnight in Saint-Germain. NOIR ÉTERNEL opens with a razor-sharp breath of black saffron and crushed pink pepper before settling into a velvety heart of Florentine iris and Somalian incense. The base lingers on the skin like tailored black cashmere.',
    concentration: '28% Extrait de Parfum',
    prices: { '30ml': 165, '50ml': 235, '100ml': 340 },
    sizes: ['30ml', '50ml', '100ml'],
    rating: 4.9,
    reviewCount: 148,
    popularity: 99,
    releaseOrder: 7,
    topNotes: ['Black Saffron', 'Calabrian Bergamot', 'Crushed Cardamom'],
    heartNotes: ['Florentine Iris', 'Somalian Incense', 'Black Violet'],
    baseNotes: ['Smoked Cedarwood', 'Labdanum Resin', 'Velvet Musk'],
    longevity: { label: 'Exceptional', score: 94, hours: '12+ hours' },
    sillage: { label: 'Commanding', score: 86 },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Eugenol, Citronellol, Geraniol, Farnesol.',
    artwork: 'noir-eternel',
    accentHex: '#C6A66A',
    liquidHex: '#8E6732',
    reviews: [
      {
        id: 'rev-ne-1',
        author: 'Camille Laurent',
        location: 'Paris, France',
        rating: 5,
        date: 'October 2026',
        title: 'An unmistakable signature on wool coats',
        comment:
          'Dark, dry saffron without a trace of cloying sweetness. Two sprays last through an entire evening at the Palais Garnier and linger subtly the next morning.',
        verified: true,
      },
      {
        id: 'rev-ne-2',
        author: 'Julian Mercer',
        location: 'London, UK',
        rating: 5,
        date: 'September 2026',
        title: 'Architectural precision in a bottle',
        comment:
          'The obsidian flacon feels heavy and substantial in hand, and the dry-down of iris and smoked cedar is remarkably poised.',
        verified: true,
      },
    ],
  },
  {
    id: 'velvet-rose',
    slug: 'velvet-rose',
    name: 'VELVET ROSE',
    subtitle: 'Eau de Parfum Intense · Floral Chypre',
    family: 'Floral',
    secondaryFamily: 'Amber',
    category: 'Feminine',
    collection: 'feminine',
    badge: 'Bestseller',
    shortDescription:
      'Crimson Damask rose petals bruised with pink pepper, suede, and golden patchouli leaf.',
    editorialStory:
      'Far removed from innocent garden florals, VELVET ROSE captures the nocturnal tension of a dark crimson rose grown at high altitude. Tempered by bitter grapefruit rind and anchored in supple suede and Indonesian patchouli, it radiates magnetic poise.',
    concentration: '22% Eau de Parfum Intense',
    prices: { '30ml': 150, '50ml': 210, '100ml': 295 },
    sizes: ['30ml', '50ml', '100ml'],
    rating: 4.8,
    reviewCount: 112,
    popularity: 95,
    releaseOrder: 6,
    topNotes: ['Pink Peppercorn', 'Blood Orange', 'Dewy Cassis'],
    heartNotes: ['Damask Rose Absolute', 'Turkish Peony', 'Clove Bud'],
    baseNotes: ['White Suede', 'Indonesian Patchouli', 'Ambergris Accord'],
    longevity: { label: 'Long-Lasting', score: 88, hours: '9–11 hours' },
    sillage: { label: 'Enveloping', score: 80 },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Citronellol, Geraniol, Limonene, Linalool, Eugenol, Citral.',
    artwork: 'velvet-rose',
    accentHex: '#C6A66A',
    liquidHex: '#D8B3A8',
    reviews: [
      {
        id: 'rev-vr-1',
        author: 'Éléonore Vance',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: 'October 2026',
        title: 'Finally, a rose with shadow and depth',
        comment:
          'The suede note transforms the rose into something velvety and modern. Never powdery or dated.',
        verified: true,
      },
    ],
  },
  {
    id: 'midnight-oud',
    slug: 'midnight-oud',
    name: 'MIDNIGHT OUD',
    subtitle: 'Extrait de Parfum · Dark Woody',
    family: 'Woody',
    secondaryFamily: 'Oriental',
    category: 'Masculine',
    collection: 'masculine',
    badge: 'Bestseller',
    shortDescription:
      'Aged Laotian oud wood, black juniper, and charred birch tempered by cool mineral vetiver.',
    editorialStory:
      'Sculpted from dark resins and cold stone, MIDNIGHT OUD explores raw contrast. A brisk opening of black juniper berry gives way to dry, resinous oud heartwood and Haitian vetiver, leaving an indelible trail of quiet authority.',
    concentration: '26% Extrait de Parfum',
    prices: { '30ml': 175, '50ml': 250, '100ml': 360 },
    sizes: ['30ml', '50ml', '100ml'],
    rating: 4.9,
    reviewCount: 96,
    popularity: 94,
    releaseOrder: 5,
    topNotes: ['Black Juniper', 'Nutmeg', 'Cold Elemi'],
    heartNotes: ['Aged Laotian Oud', 'Cypress Needle', 'Violet Leaf'],
    baseNotes: ['Haitian Vetiver', 'Charred Birch', 'Black Amber'],
    longevity: { label: 'Exceptional', score: 96, hours: '14+ hours' },
    sillage: { label: 'Commanding', score: 89 },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Evernia Prunastri Extract.',
    artwork: 'midnight-oud',
    accentHex: '#C6A66A',
    liquidHex: '#5A4127',
    reviews: [
      {
        id: 'rev-mo-1',
        author: 'Henrik Lindqvist',
        location: 'Stockholm, Sweden',
        rating: 5,
        date: 'September 2026',
        title: 'Refined oud without harshness',
        comment:
          'Smooth, dry, and tailored. The cypress and vetiver keep the oud crisp rather than heavy.',
        verified: true,
      },
    ],
  },
  {
    id: 'blanc-absolu',
    slug: 'blanc-absolu',
    name: 'BLANC ABSOLU',
    subtitle: 'Eau de Parfum · Crisp Mineral Floral',
    family: 'Fresh',
    secondaryFamily: 'Citrus',
    category: 'Unisex',
    collection: 'signature',
    badge: 'New Arrival',
    shortDescription:
      'Sun-bleached Calabrian neroli, silver white tea, and airy cedar-musk skin warmth.',
    editorialStory:
      'Inspired by alabaster light pouring through tall Parisian atelier windows. BLANC ABSOLU balances sparkling green bergamot and delicate white tea steam with a clean, sculptural base of ambrette seed and pale cashmere wood.',
    concentration: '20% Eau de Parfum',
    prices: { '30ml': 140, '50ml': 195, '100ml': 275 },
    sizes: ['30ml', '50ml', '100ml'],
    rating: 4.7,
    reviewCount: 64,
    popularity: 88,
    releaseOrder: 10,
    topNotes: ['Green Bergamot', 'Silver White Tea', 'Aldehydes'],
    heartNotes: ['Calabrian Neroli', 'White Iris', 'Fig Milk'],
    baseNotes: ['Ambrette Seed', 'Pale Cedar', 'Clean Skin Musk'],
    longevity: { label: 'Balanced', score: 78, hours: '7–9 hours' },
    sillage: { label: 'Intimate', score: 66 },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Linalool, Limonene, Geraniol, Citral, Farnesol.',
    artwork: 'blanc-absolu',
    accentHex: '#C6A66A',
    liquidHex: '#EFE8DA',
    reviews: [
      {
        id: 'rev-ba-1',
        author: 'Sora Takahashi',
        location: 'Tokyo, Japan',
        rating: 5,
        date: 'November 2026',
        title: 'Luminous minimalism',
        comment:
          'Feels like crisp linen and sunlight on warm stone. My everyday signature from spring through winter.',
        verified: true,
      },
    ],
  },
  {
    id: 'golden-ember',
    slug: 'golden-ember',
    name: 'GOLDEN EMBER',
    subtitle: 'Reserve Privée · Spiced Amber Gourmand',
    family: 'Amber',
    secondaryFamily: 'Gourmand',
    category: 'Unisex',
    collection: 'exclusive',
    badge: 'Limited Edition',
    shortDescription:
      'Siam benzoin tears, smoked Madagascar vanilla bean, and aged cognac barrel accord.',
    editorialStory:
      'Macerated for six months in charred French oak casks, GOLDEN EMBER glows from within. Rich honeyed labdanum and roasted tonka bean wrap around bitter cocoa husk and warm saffron, creating a luminous sanctuary against winter air.',
    concentration: '30% Reserve Extrait',
    prices: { '30ml': 190, '50ml': 275, '100ml': 390 },
    sizes: ['30ml', '50ml', '100ml'],
    rating: 5.0,
    reviewCount: 54,
    popularity: 92,
    releaseOrder: 9,
    topNotes: ['Bitter Orange Peel', 'Cinnamon Bark', 'Cognac Accord'],
    heartNotes: ['Siam Benzoin', 'Roasted Tonka', 'Heliotrope'],
    baseNotes: ['Smoked Vanilla Bean', 'Golden Labdanum', 'Oakwood'],
    longevity: { label: 'Exceptional', score: 97, hours: '14+ hours' },
    sillage: { label: 'Opulent', score: 90 },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Coumarin, Benzyl Benzoate, Cinnamal, Limonene, Linalool.',
    artwork: 'golden-ember',
    accentHex: '#C6A66A',
    liquidHex: '#C8893A',
    reviews: [
      {
        id: 'rev-ge-1',
        author: 'Marcello Conti',
        location: 'Milan, Italy',
        rating: 5,
        date: 'October 2026',
        title: 'Liquid gold without excess sugar',
        comment:
          'The cognac and oak dry-down elevates the vanilla into true haute parfumerie.',
        verified: true,
      },
    ],
  },
  {
    id: 'rose-imperiale',
    slug: 'rose-imperiale',
    name: 'ROSE IMPÉRIALE',
    subtitle: 'Eau de Parfum · Radiant Floral',
    family: 'Floral',
    secondaryFamily: 'Citrus',
    category: 'Feminine',
    collection: 'feminine',
    badge: 'New Arrival',
    shortDescription:
      'Centifolia rose harvested at dawn in Grasse, lifted by crushed mandarin and white cedar.',
    editorialStory:
      'A celebration of timeless couture elegance. ROSE IMPÉRIALE pairs luminous Grasse Centifolia petals with sparkling Italian mandarin and a whisper of white sandalwood—effortlessly radiant from morning gallery openings to candlelit dinners.',
    concentration: '20% Eau de Parfum',
    prices: { '30ml': 145, '50ml': 205, '100ml': 285 },
    sizes: ['30ml', '50ml', '100ml'],
    rating: 4.8,
    reviewCount: 73,
    popularity: 86,
    releaseOrder: 8,
    topNotes: ['Italian Mandarin', 'Lychee Skin', 'Bergamot Zest'],
    heartNotes: ['Grasse Centifolia Rose', 'Magnolia Petal', 'Jasmine Sambac'],
    baseNotes: ['Mysore Sandalwood', 'White Cedar', 'Sheer Musk'],
    longevity: { label: 'Long-Lasting', score: 84, hours: '8–10 hours' },
    sillage: { label: 'Graceful', score: 74 },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Citronellol, Limonene, Geraniol, Linalool, Benzyl Salicylate.',
    artwork: 'rose-imperiale',
    accentHex: '#C6A66A',
    liquidHex: '#E8C5B8',
    reviews: [
      {
        id: 'rev-ri-1',
        author: 'Claire Beaumont',
        location: 'Lyon, France',
        rating: 5,
        date: 'November 2026',
        title: 'Effortless French elegance',
        comment:
          'Sparkling at first spray and softens into a gorgeous creamy sandalwood-rose aura.',
        verified: true,
      },
    ],
  },
  {
    id: 'ambre-fume',
    slug: 'ambre-fume',
    name: 'AMBRE FUMÉ',
    subtitle: 'Reserve Privée · Smoky Amber',
    family: 'Gourmand',
    secondaryFamily: 'Amber',
    category: 'Unisex',
    collection: 'exclusive',
    shortDescription:
      'Roasted cacao husk, dark rum resin, and smoky guaiac wood wrapped in warm tonka.',
    editorialStory:
      'An intoxicating nocturnal study in chiaroscuro. AMBRE FUMÉ contrasts dry roasted cacao and smoky guaiac timber with velvety praline warmth, leaving a sculptural, deeply sensual impression.',
    concentration: '28% Extrait de Parfum',
    prices: { '30ml': 185, '50ml': 265, '100ml': 375 },
    sizes: ['30ml', '50ml', '100ml'],
    rating: 4.9,
    reviewCount: 41,
    popularity: 83,
    releaseOrder: 4,
    topNotes: ['Black Pepper', 'Roasted Cacao Husk', 'Davana'],
    heartNotes: ['Dark Rum Resin', 'Guaiac Wood', 'Turkish Tobacco Leaf'],
    baseNotes: ['Tonka Absolute', 'Burnt Sugar', 'Bourbon Vanilla'],
    longevity: { label: 'Exceptional', score: 93, hours: '12+ hours' },
    sillage: { label: 'Enveloping', score: 84 },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Coumarin, Eugenol, Limonene, Linalool.',
    artwork: 'ambre-fume',
    accentHex: '#C6A66A',
    liquidHex: '#9C5C2E',
    reviews: [
      {
        id: 'rev-af-1',
        author: 'Nadia Al-Mansoor',
        location: 'Dubai, UAE',
        rating: 5,
        date: 'October 2026',
        title: 'Dark gourmand perfection',
        comment:
          'Rich cacao and tobacco smoke balanced so cleanly it wears like fine evening silk.',
        verified: true,
      },
    ],
  },
  {
    id: 'cedre-solaire',
    slug: 'cedre-solaire',
    name: 'CÈDRE SOLAIRE',
    subtitle: 'Eau de Parfum · Crisp Citrus Woods',
    family: 'Citrus',
    secondaryFamily: 'Woody',
    category: 'Masculine',
    collection: 'masculine',
    shortDescription:
      'Sun-drenched Amalfi citron, crushed sage, and dry Atlas cedarwood.',
    editorialStory:
      'Mediterranean warmth meets architectural restraint. CÈDRE SOLAIRE opens with brisk Amalfi citron and wild clary sage over salt-warmed Atlas cedar and crisp oakmoss—sharp, tailored, and timeless.',
    concentration: '20% Eau de Parfum',
    prices: { '30ml': 140, '50ml': 195, '100ml': 275 },
    sizes: ['30ml', '50ml', '100ml'],
    rating: 4.7,
    reviewCount: 68,
    popularity: 85,
    releaseOrder: 3,
    topNotes: ['Amalfi Citron', 'Petitgrain', 'Sea Salt'],
    heartNotes: ['Wild Clary Sage', 'Lavender Absolute', 'Geranium'],
    baseNotes: ['Atlas Cedarwood', 'Oakmoss', 'Mineral Ambroxan'],
    longevity: { label: 'Long-Lasting', score: 82, hours: '8–10 hours' },
    sillage: { label: 'Tailored', score: 75 },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citral, Geraniol.',
    artwork: 'cedre-solaire',
    accentHex: '#C6A66A',
    liquidHex: '#C9B37E',
    reviews: [
      {
        id: 'rev-cs-1',
        author: 'Olivier Moreau',
        location: 'Nice, France',
        rating: 5,
        date: 'August 2026',
        title: 'Sharp, sunlit, never generic',
        comment:
          'The cedar and salt dry-down lasts well past sunset without turning synthetic.',
        verified: true,
      },
    ],
  },
];

export interface GiftCoffret {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  contents: string;
  linkedProductId: string;
  artwork: 'noir-eternel' | 'velvet-rose' | 'golden-ember';
}

export const GIFT_COFFRETS: GiftCoffret[] = [
  {
    id: 'coffret-discovery',
    name: "L'ÉCRIN NOIR DISCOVERY",
    subtitle: 'Six 10ml Glass Atomizers',
    description:
      'An architectural obsidian coffret housing our six signature Extrait and Eau de Parfum creations, accompanied by a $40 privilege toward your next full-size flacon.',
    price: 160,
    contents: '6 × 10ml Travel Flacons · Atelier Guide',
    linkedProductId: 'noir-eternel',
    artwork: 'noir-eternel',
  },
  {
    id: 'coffret-signature-duo',
    name: 'THE SIGNATURE DUO COFFRET',
    subtitle: '50ml Flacon + Leather Travel Spray',
    description:
      'NOIR ÉTERNEL 50ml paired with a hand-stitched black calfskin 10ml atomizer in our ivory silk-lined presentation box.',
    price: 295,
    contents: '1 × 50ml Flacon · 1 × 10ml Travel Case',
    linkedProductId: 'noir-eternel',
    artwork: 'golden-ember',
  },
  {
    id: 'coffret-rose-atelier',
    name: 'VELVET ROSE COUTURE SET',
    subtitle: '100ml Flacon + Scented Body Elixir',
    description:
      'Our bestselling VELVET ROSE Eau de Parfum Intense paired with a cold-pressed Damascus rose dry body oil, wrapped in gold-stamped ivory ribbon.',
    price: 345,
    contents: '1 × 100ml Flacon · 1 × 50ml Body Elixir',
    linkedProductId: 'velvet-rose',
    artwork: 'velvet-rose',
  },
];
