import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth-service';
import { RegisterRequest } from '../../../models/auth/register-request';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  confirmPassword = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register(): void {
    this.errorMessage = '';

    if (this.form.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.form.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }

    this.isSubmitting = true;

    this.authService
      .register(this.form)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMessage = 'We could not create your account. Please try again.';
        },
      });
  }
}
