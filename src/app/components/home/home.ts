import { Component, inject, signal } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { Productss } from '../../types/product';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ProductCard } from '../product-card/product-card';
import { CarouselSlider } from '../carousel-slider/carousel-slider';

@Component({
  imports: [MatBadgeModule, MatCardModule, ProductCard,CarouselSlider],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  customerService = inject(CustomerService);
  newProducts = signal<Productss[]>([]);
  featuredProducts = signal<Productss[]>([]);

  ngOnInit() {
    this.getfeaturedProducts();
    this.getnewProducts();
  }

  getfeaturedProducts() {
    this.customerService.getFeaturedProducts().subscribe((result: Productss[]) => {
      this.featuredProducts.set(result);
    });
  }

  getnewProducts() {
    this.customerService.getNewProducts().subscribe((result: Productss[]) => {
      this.newProducts.set(result);
    });
  }
}
