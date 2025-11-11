export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface HeroData {
  name: string;
  role: string;
  headline: string;
  subtitle?: string;
  resumeUrl?: string;
  image?: string;
  social?: SocialLinks;
  metrics?: { label: string; value: string }[];
}
