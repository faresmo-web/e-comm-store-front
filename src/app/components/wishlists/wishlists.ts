import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WishlistCart } from '../../services/wishlist-cart';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule, ProductCard],
  styleUrl: './wishlists.scss',
  templateUrl: './wishlists.html',
})
export class Wishlists implements OnInit {
  WishlistCartService = inject(WishlistCart);

  ngOnInit(): void {
    this.WishlistCartService.init();
  }
}
