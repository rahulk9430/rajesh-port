import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { ServicesItem, ServicesPayload } from 'src/app/models/service.model';

@Component({
  selector: 'app-services-grid',
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.css']
})
export class ServicesGridComponent implements OnInit {
  data!: ServicesPayload;
  loading = true;
  error = false;

  query = '';
  filtered: ServicesItem[] = [];

  constructor(private svc: DataService) {}

  ngOnInit(): void {
    this.svc.getIntroServices().subscribe({
      next: (d) => {
        this.data = d;
        this.filtered = d.services;   // ServicesItem[]
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  onSearch(val: string): void {
    const q = (val || '').toLowerCase().trim();
    this.query = q;
    if (!q) { this.filtered = this.data.services; return; }

    this.filtered = this.data.services.filter(s => {
      const title = (s.title || '').toLowerCase();
      const summary = (s.summary || '').toLowerCase();
      const details = (s.details || '').toLowerCase();
      const tags = (s.tags || []).map(t => (t || '').toLowerCase());
      return title.includes(q) || summary.includes(q) || details.includes(q) || tags.some(t => t.includes(q));
    });
  }
}
