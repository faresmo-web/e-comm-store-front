import { Component, inject, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Productss } from '../../types/product';
import { CustomerService } from '../../services/customer';
import { RouterLink } from '@angular/router';


@Component({
  imports: [
    CarouselModule,
    RouterLink
  ],
  selector: 'app-carousel-slider',
  styleUrl: './carousel-slider.scss',
  templateUrl: './carousel-slider.html',
})
export class CarouselSlider {
  customerService = inject(CustomerService);
  featuredProducts = signal<Productss[]>([]);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['‹', '›'],
    items: 1,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  };

  getFeaturedProducts() {
    this.customerService.getFeaturedProducts().subscribe((result: Productss[]) => {
      this.featuredProducts.set(result);
    });
  }

  ngOnInit(): void {
    this.getFeaturedProducts();
  }
}
