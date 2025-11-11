export interface Experience {
  company: string;
  role: string;
  start: string; // '2018-01'
  end?: string;  // or 'Present'
  location?: string;
  details: string[];
  statesHandled?: string[];
}
