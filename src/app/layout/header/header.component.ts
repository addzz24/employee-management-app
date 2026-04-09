import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  imports: [MatIcon],
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
