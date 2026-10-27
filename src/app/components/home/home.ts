import { Component, inject, signal } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { Productss } from '../../types/product';
import { Category } from '../../types/category';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../product-card/product-card';
import { CarouselSlider } from '../carousel-slider/carousel-slider';

@Component({
  imports: [
    ProductCard,
    CarouselSlider,
    MatIcon,
    MatButtonModule,
    RouterLink
  ],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  customerService = inject(CustomerService);
  newProducts = signal<Productss[]>([]);
  featuredProducts = signal<Productss[]>([]);
  categories = signal<Category[]>([]);

  ngOnInit() {
    this.getfeaturedProducts();
    this.getnewProducts();
    this.getCategories();
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

  getCategories() {
    this.customerService.getCategories().subscribe((result: Category[]) => {
      this.categories.set(result);
    });
  }
}
