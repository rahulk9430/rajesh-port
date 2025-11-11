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
