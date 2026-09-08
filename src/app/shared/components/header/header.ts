import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import {
  LucidePlane,
  LucideMenu,
  LucideX,
  LucideHouse,
  LucideSearch,
  LucideTicket,
  LucideLogIn,
  LucideUserPlus,
  LucideLogOut,
  LucideUser,
} from '@lucide/angular';

import { AuthService } from '../../../core/services/auth-service';

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
    LucideLogIn,
    LucideUserPlus,
    LucideLogOut,
    LucideUser,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/']);
  }
}
