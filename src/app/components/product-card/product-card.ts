import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Productss } from '../../types/product';
import { RouterLink } from '@angular/router';
import { WishlistCart } from '../../services/wishlist-cart';

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
  WishlistCartService = inject(WishlistCart);

  get discountPercent(): number {
    if (this.product?.price && this.product?.discount && this.product.discount < this.product.price) {
      return Math.round(((this.product.price - this.product.discount) / this.product.price) * 100);
    }
    return 0;
  }

  get hasDiscount(): boolean {
    return !!(this.product?.discount && this.product.discount > 0 && this.product.discount < this.product.price);
  }

  toggleWishlist(product: Productss) {
    if (!product?._id) return;

    if (this.isWishlisted(product)) {
      // Optimistic update
      this.WishlistCartService.wishlist.update((list) =>
        list.filter((x: any) => (x?._id || (Array.isArray(x) && x[0]?._id)) !== product._id)
      );

      this.WishlistCartService.removeFromWishlist(product._id).subscribe({
        next: () => {
          this.WishlistCartService.init();
        },
        error: (err) => {
          console.error('Error removing from wishlist:', err);
          this.WishlistCartService.init();
        }
      });
    } else {
      // Optimistic update
      this.WishlistCartService.wishlist.update((list) => [...list, product]);

      this.WishlistCartService.addToWishlist(product._id).subscribe({
        next: () => {
          this.WishlistCartService.init();
        },
        error: (err) => {
          console.error('Error adding to wishlist:', err);
          this.WishlistCartService.init();
        }
      });
    }
  }

  isWishlisted(product: Productss): boolean {
    if (!product?._id) return false;
    const currentList = this.WishlistCartService.wishlist();
    if (!currentList) return false;
    return currentList.some((x: any) => {
      if (!x) return false;
      const id = Array.isArray(x) ? x[0]?._id : x?._id;
      return id === product._id;
    });
  }

  onAddToCart() {
  }
}
