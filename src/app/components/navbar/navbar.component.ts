import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.setBodyScroll(this.menuOpen);
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.setBodyScroll(false);
  }

  private setBodyScroll(disable: boolean) {
    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = disable ? 'hidden' : '';
      document.body.style.overflow = disable ? 'hidden' : '';
    }
  }

  // close on Escape
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(_event: KeyboardEvent) {
    if (this.menuOpen) this.closeMenu();
  }

  // optionally close menu on navigation
  // (uncomment if you want nav clicks to auto-close without click handlers on anchors)
  // @HostListener('window:popstate')
  // onRouteChange() { this.closeMenu(); }
}
