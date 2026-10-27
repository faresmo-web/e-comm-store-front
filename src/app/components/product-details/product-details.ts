import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer';
import { Productss } from '../../types/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerService);

  product = signal<Productss | null>(null);
  loading = signal(true);
  error = signal(false);
  selectedImage = signal<string>('');
  quantity = signal(1);

  get hasDiscount(): boolean {
    const p = this.product();
    return !!p && !!p.discount && p.discount > 0 && p.discount < p.price;
  }

  get discountPercent(): number {
    const p = this.product();
    if (!p || !this.hasDiscount) return 0;
    return Math.round(((p.price - p.discount) / p.price) * 100);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error.set(true); this.loading.set(false); return; }

    this.customerService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.selectedImage.set(product.images?.[0] || '');
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  selectImage(img: string) {
    this.selectedImage.set(img);
  }

  increaseQty() {
    this.quantity.update(q => q + 1);
  }

  decreaseQty() {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  addToCart() {
    const p = this.product();
    if (!p) return;
    console.log('Add to cart:', p._id, 'qty:', this.quantity());
  }
}
