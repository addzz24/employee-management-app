import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);
  currentRoute = signal('');

  constructor() {
    this.currentRoute.set(this.router.url);
    this.router.events.subscribe((event:any) => {
        this.currentRoute.set(event?.url);
    });
  }

  onNavItemClick(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
