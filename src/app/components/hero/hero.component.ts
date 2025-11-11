import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeroData } from 'src/app/models/hero.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  data?: HeroData;
  loading = true;
  error = '';

  metrics = [
    { label: 'Years Experience', value: '14+' },
    { label: 'Employees Managed', value: '7000+' },
    { label: 'Compliance', value: '100%' }
  ];

  subtitleTyped = '';
  private subtitleIndex = 0;
  private typeTimer?: any;
  private sub?: Subscription;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.dataService.getHero().subscribe({
      next: d => {
        this.data = d;
        if (d?.subtitle) this.startTyping(d.subtitle);
        if (d?.metrics && d.metrics.length) this.metrics = d.metrics;
        this.loading = false;
      },
      error: e => {
        console.error('Hero load error', e);
        this.error = 'Unable to load hero content';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.typeTimer);
    this.sub?.unsubscribe();
  }

  startTyping(text: string) {
    this.subtitleTyped = '';
    this.subtitleIndex = 0;
    clearInterval(this.typeTimer);
    this.typeTimer = setInterval(() => {
      this.subtitleIndex++;
      this.subtitleTyped = text.slice(0, this.subtitleIndex);
      if (this.subtitleIndex >= text.length) {
        clearInterval(this.typeTimer);
      }
    }, 28);
  }

  goToContact(selected?: string) {
    if (selected) {
      this.router.navigate(['/contact'], { queryParams: { service: selected } });
    } else {
      this.router.navigate(['/contact']);
    }
  }

  // moved window usage into component method (avoids template error)
  scrollDown(): void {
    // guard for SSR/unusual envs:
    if (typeof window !== 'undefined' && window?.scrollTo) {
      window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
    }
  }
}
