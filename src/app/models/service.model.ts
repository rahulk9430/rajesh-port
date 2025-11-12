// src/app/core/models/service.model.ts
export interface ServiceItem {
  id: string;
  title: string;
  short: string;     // 1-line summary
  details?: string;  // longer description (optional)
  icon?: string;     // emoji or small icon class
  ctaLabel?: string; // e.g. "Request Service"
  tags?: string[];   // quick tags like PF, ESIC, Automation
}


export interface ServiceIntroData {
  kicker?: string;
  title: string;
  body: string | string[];
  imageUrl?: string;
  imageAlt?: string;
}


export interface FunFactItem {
  value: number;         // 180000
  suffix?: string;       // '+'
  label?: string;        // line 1
  sublabel?: string;     // line 2
}

export interface FunFactsData {
  kicker?: string;       // 'FUN FACTS'
  title: string;         // 'Secure, Compliant and easy'
  items: FunFactItem[];
}

/* 👉 Cards section uses this shape */
export interface ServicesItem {
  icon: string;
  title: string;
  summary: string;
  details: string;
  tags: string[];
  ctaText: string;
  ctaHref: string;
}

/* 👉 FIX: payload for cards must use ServicesItem[] */
export interface ServicesPayload {
  heading: string;
  subheading?: string;
  services: ServicesItem[];
}
