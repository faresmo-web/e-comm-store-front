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
  isWishlisted = false;

  get discountPercent(): number {
    if (this.product?.price && this.product?.discount && this.product.discount < this.product.price) {
      return Math.round(((this.product.price - this.product.discount) / this.product.price) * 100);
    }
    return 0;
  }

  get hasDiscount(): boolean {
    return !!(this.product?.discount && this.product.discount > 0 && this.product.discount < this.product.price);
  }

  toggleWishlist(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.isWishlisted = !this.isWishlisted;
  }

  onAddToCart(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }
}
