import { isDevMode } from '@angular/core';

// CloudFront forwards /api/* to the backend origin. Local ng serve calls Docker directly.
export const API_BASE_URL = isDevMode() ? 'http://localhost:8081/api' : '/api';
