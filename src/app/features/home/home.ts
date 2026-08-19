import { Component } from '@angular/core';

import { SearchForm } from '../../shared/components/search-form/search-form';

@Component({
  selector: 'app-home',
  imports: [SearchForm],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
