import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Productss } from '../../types/product';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  selector: 'app-product-card',
  styleUrl: './product-card.scss',
  templateUrl: './product-card.html',
})
export class ProductCard {

  @Input() product!: Productss;
}
