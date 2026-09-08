import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth-service';
import { LoginRequest } from '../../../models/auth/login-request';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: LoginRequest = {
    email: '',
    password: '',
  };

  errorMessage = '';
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  login(): void {
    this.errorMessage = '';
    this.isSubmitting = true;

    this.authService
      .login(this.form)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';

          this.router.navigateByUrl(returnUrl);
        },
        error: () => {
          this.errorMessage = 'The email or password is incorrect. Please try again.';
        },
      });
  }
}
