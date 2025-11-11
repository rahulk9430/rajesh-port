import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { ServiceItem } from 'src/app/models/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services: ServiceItem[] = [];
  loading = true;
  error = '';

  // small filter / search state
  query = '';
  activeTag = '';

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getServices().subscribe({
      next: s => { this.services = s; this.loading = false; },
      error: e => { console.error(e); this.error = 'Could not load services'; this.loading = false; }
    });
  }

  openContact(service?: ServiceItem) {
    // navigate to contact and optionally pass the service id as state/query
    this.router.navigate(['/contact'], { queryParams: { service: service?.id } });
  }

  // simple filtering
  filtered(): ServiceItem[] {
    const q = this.query.trim().toLowerCase();
    return this.services.filter(s =>
      (!q || s.title.toLowerCase().includes(q) || s.short.toLowerCase().includes(q) || (s.tags || []).join(' ').toLowerCase().includes(q))
      && (!this.activeTag || (s.tags || []).includes(this.activeTag))
    );
  }

  setTag(tag: string) {
    this.activeTag = this.activeTag === tag ? '' : tag;
  }
}
