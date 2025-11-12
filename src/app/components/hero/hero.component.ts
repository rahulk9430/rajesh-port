import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { HeroData } from '../../models/hero.model';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  data: HeroData | null = null;
  images: string[] = [];       // normalised images array used by template
  current = 0;
  loading = true;
  private slideTimerSub: Subscription | null = null;

  // touch swipe
  private touchStartX = 0;
  private touchEndX = 0;

  constructor(private dataService: DataService, private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.dataService.getHero().subscribe({
      next: (d) => {
        this.data = d;
        this.loading = false;

        // normalize images: prefer d.images, fallback to single d.image
        if (d) {
          if (Array.isArray(d.images) && d.images.length > 0) {
            this.images = d.images;
          } else if (typeof d.image === 'string' && d.image.trim()) {
            this.images = [d.image];
          } else {
            this.images = [];
          }
        }

        if (this.images.length > 0) {
          this.current = 0;
          this.startAutoSlide();
        }
      },
      error: (err) => {
        console.error('Failed to load hero data', err);
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    if (!this.images || this.images.length <= 1) return;
    this.slideTimerSub = timer(3000, 3000).subscribe(() => this.next());
  }

  private stopAutoSlide(): void {
    if (this.slideTimerSub) {
      this.slideTimerSub.unsubscribe();
      this.slideTimerSub = null;
    }
  }

  next(): void {
    if (!this.images?.length) return;
    this.current = (this.current + 1) % this.images.length;
  }

  prev(): void {
    if (!this.images?.length) return;
    this.current = (this.current - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number): void {
    if (!this.images?.length) return;
    this.current = Math.max(0, Math.min(index, this.images.length - 1));
    this.startAutoSlide();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      this.next(); this.startAutoSlide();
    } else if (e.key === 'ArrowLeft') {
      this.prev(); this.startAutoSlide();
    } else if (e.key === 'Escape') {
      this.stopAutoSlide();
    }
  }

  onTouchStart(evt: TouchEvent) {
    this.touchStartX = evt.touches?.[0]?.clientX ?? 0;
    this.stopAutoSlide();
  }

  onTouchEnd(evt: TouchEvent) {
    this.touchEndX = evt.changedTouches?.[0]?.clientX ?? 0;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) this.next();
      else this.prev();
    }
    this.startAutoSlide();
  }

  onMouseEnter() { this.stopAutoSlide(); }
  onMouseLeave() { this.startAutoSlide(); }

  // helper: returns the subtitle from either field
  get subtitle(): string | undefined {
    return this.data?.subheadline ?? this.data?.subtitle;
  }
}
