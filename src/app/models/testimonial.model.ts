export interface TestimonialItem {
  quote: string;
  name: string;
  role?: string;
  rating?: number;     // 0–5
  avatar?: string;
  logo?: string;
}

export interface TestimonialsData {
  heading: string;
  subheading?: string;
  items: TestimonialItem[];
}
