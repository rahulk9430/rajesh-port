import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { TestimonialItem, TestimonialsData } from 'src/app/models/testimonial.model';

@Component({
  selector: 'app-testimonial-carousel',
  templateUrl: './testimonial-carousel.component.html',
  styleUrls: ['./testimonial-carousel.component.css']
})
export class TestimonialCarouselComponent implements OnInit, OnDestroy {
  data!: TestimonialsData;
  loading = true;
  error = false;

  idx = 0;
  timer: any = null;

  // touch
  private startX = 0;

  constructor(private svc: DataService) {}

  ngOnInit(): void {
    this.svc.getTestimonials().subscribe({
      next: (d) => { this.data = d; this.loading = false; this.start(); },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  ngOnDestroy(): void { this.stop(); }

  start(): void {
    this.stop();
    if (!this.data?.items || this.data.items.length <= 1) return;
    this.timer = setInterval(() => this.next(), 3500);
  }
  stop(): void { if (this.timer) { clearInterval(this.timer); this.timer = null; } }

  next(): void {
    const n = this.data.items.length;
    this.idx = (this.idx + 1) % n;
  }
  prev(): void {
    const n = this.data.items.length;
    this.idx = (this.idx - 1 + n) % n;
  }
  go(i: number): void {
    const n = this.data.items.length;
    this.idx = Math.max(0, Math.min(i, n - 1));
    this.start();
  }

  // keyboard
  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') { this.next(); this.start(); }
    else if (e.key === 'ArrowLeft') { this.prev(); this.start(); }
  }

  // touch swipe
  onTouchStart(evt: TouchEvent) { this.startX = evt.touches[0]?.clientX || 0; this.stop(); }
  onTouchEnd(evt: TouchEvent) {
    const end = evt.changedTouches[0]?.clientX || 0;
    const diff = this.startX - end;
    if (Math.abs(diff) > 40) diff > 0 ? this.next() : this.prev();
    this.start();
  }

  stars(rating = 0): number[] {
    const r = Math.max(0, Math.min(5, rating));
    return Array.from({ length: 5 }, (_, i) => i < r ? 1 : 0);
  }

  trackByIndex(_: number, __: TestimonialItem) { return _; }
}
