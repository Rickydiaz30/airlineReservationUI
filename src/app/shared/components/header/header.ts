import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  LucidePlane,
  LucideMenu,
  LucideX,
  LucideHouse,
  LucideSearch,
  LucideTicket,
} from '@lucide/angular';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucidePlane,
    LucideMenu,
    LucideX,
    LucideHouse,
    LucideSearch,
    LucideTicket,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
