import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { AuthResponse } from '../../models/auth/auth-response';
import { LoginRequest } from '../../models/auth/login-request';
import { RegisterRequest } from '../../models/auth/register-request';
import { User } from '../../models/auth/user';
import { API_BASE_URL } from '../api-base-url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${API_BASE_URL}/auth`;

  private readonly sessionKey = 'airlineAuthSession';

  private readonly currentUserSignal = signal<User | null>(this.loadCurrentUser());

  readonly currentUser = this.currentUserSignal.asReadonly();

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<User>(`${this.apiUrl}/register`, request, { withCredentials: true }).pipe(
      map((user) => this.createResponse(user)),
      tap((response) => this.saveSession(response)),
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<User>(`${this.apiUrl}/login`, request, { withCredentials: true }).pipe(
      map((user) => this.createResponse(user)),
      tap((response) => this.saveSession(response)),
    );
  }

  logout(): void {
    this.http.post<void>(`${this.apiUrl}/logout`, null, { withCredentials: true }).subscribe({
      error: (error) => console.error('Unable to end server session:', error),
    });
    localStorage.removeItem(this.sessionKey);
    sessionStorage.removeItem('currentReservation');

    this.currentUserSignal.set(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSignal() !== null;
  }

  private createResponse(user: User): AuthResponse {
    return {
      user,
      token: '',
    };
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
