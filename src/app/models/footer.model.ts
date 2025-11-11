// src/app/core/models/footer.model.ts

/** Single footer link item */
export interface FooterLink {
  /** Display label text, e.g. 'About' */
  label: string;

  /** Path or URL destination */
  path: string;

  /** true if it should open in new tab */
  external?: boolean;
}

/** Each footer column, e.g. "Resources" or "Company" */
export interface FooterLinkGroup {
  /** Column title */
  title: string;

  /** Items in that column */
  items: FooterLink[];
}

/** Social media links section */
export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

/** Contact section fields */
export interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
}

/** Complete footer data model */
export interface FooterData {
  /** Brand / site name */
  brandName: string;

  /** Short description under brand */
  brief?: string;

  /** Link columns */
  links: FooterLinkGroup[];

  /** Contact info */
  contact?: ContactInfo;

  /** Social profiles */
  social?: SocialLinks;

  /** Copyright text for bottom bar */
  copyright?: string;
}
