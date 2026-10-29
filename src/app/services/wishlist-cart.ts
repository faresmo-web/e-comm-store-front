import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Productss } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistCart {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  wishlist = signal<Productss[]>([]);
  cart: any[] = [];

  init() {
    return this.getWishlist().subscribe({
      next: (result: any) => {
        const list = Array.isArray(result) ? result.flat().filter(Boolean) : [];
        this.wishlist.set(list);
      },
      error: (err) => {
        console.error('Wishlist load error:', err);
      }
    });
  }

  getWishlist() {
    return this.http.get<Productss[]>(`${this.baseUrl}/customer/wishlists`);
  }

  addToWishlist(productId: string) {
    return this.http.post(`${this.baseUrl}/customer/wishlists/${productId}`, {});
  }

  removeFromWishlist(productId: string) {
    return this.http.delete(`${this.baseUrl}/customer/wishlists/${productId}`);
  }
}
