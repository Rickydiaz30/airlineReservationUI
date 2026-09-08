import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AuthResponse } from '../../models/auth/auth-response';
import { LoginRequest } from '../../models/auth/login-request';
import { RegisterRequest } from '../../models/auth/register-request';
import { User } from '../../models/auth/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sessionKey = 'airlineAuthSession';

  private readonly currentUserSignal = signal<User | null>(this.loadCurrentUser());

  readonly currentUser = this.currentUserSignal.asReadonly();

  register(request: RegisterRequest): Observable<AuthResponse> {
    const user: User = {
      id: Date.now(),
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      role: 'CUSTOMER',
    };

    const response: AuthResponse = {
      user,
      token: 'demo-registration-token',
    };

    this.saveSession(response);

    return of(response).pipe(delay(500));
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    const username = request.email.split('@')[0].trim();

    const user: User = {
      id: 1,
      firstName: username,
      lastName: '',
      email: request.email,
      role: 'CUSTOMER',
    };

    const response: AuthResponse = {
      user,
      token: 'demo-login-token',
    };

    this.saveSession(response);

    return of(response).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.currentUserSignal.set(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSignal() !== null;
  }

  private saveSession(response: AuthResponse): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(response));

    this.currentUserSignal.set(response.user);
  }

  private loadCurrentUser(): User | null {
    const savedSession = localStorage.getItem(this.sessionKey);

    if (!savedSession) {
      return null;
    }

    try {
      const response = JSON.parse(savedSession) as AuthResponse;

      return response.user;
    } catch {
      localStorage.removeItem(this.sessionKey);
      return null;
    }
  }
}
