import { Component, inject, signal, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Productss } from '../../types/product';
import { CustomerService } from '../../services/customer';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [
    CarouselModule,
    RouterLink,
    MatIconModule,
    MatButtonModule
  ],
  selector: 'app-carousel-slider',
  styleUrl: './carousel-slider.scss',
  templateUrl: './carousel-slider.html',
})
export class CarouselSlider implements OnInit {
  customerService = inject(CustomerService);
  featuredProducts = signal<Productss[]>([]);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    navSpeed: 900,
    navText: [
      '<span class="nav-arrow">&lsaquo;</span>',
      '<span class="nav-arrow">&rsaquo;</span>'
    ],
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
