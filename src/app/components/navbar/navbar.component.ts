import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen = false;
    });
  }

  get ariaExpanded(): string { return this.menuOpen ? 'true' : 'false'; }

toggleMenu() { this.menuOpen = !this.menuOpen; }
closeMenu() { this.menuOpen = false; }


  @HostListener('window:keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent) {
    if (this.menuOpen) { this.menuOpen = false; event.stopPropagation(); }
  }
}
