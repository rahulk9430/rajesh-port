// src/app/models/hero.model.ts
export interface HeroCta {
  label: string;
  href?: string;
}

export interface HeroData {
  name?: string;
  role?: string;

  // main content
  headline: string;

  // optional variants — keep both names for compatibility
  subheadline?: string;
  subtitle?: string;

  // CTAs
  ctas?: HeroCta[];   // optional array of calls-to-action

  // images: support either a single `image` (legacy) or `images` array
  image?: string;     // legacy single-image field (keep for old mocks)
  images?: string[];  // preferred: multiple images for slideshow
}
