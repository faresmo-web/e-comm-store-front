import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { Productss } from '../../types/product';
import { ProductCard } from '../product-card/product-card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../../types/category';
import { Brands } from '../../types/brand';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    ProductCard,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    FormsModule
  ],
  selector: 'app-product-list',
  styleUrl: './product-list.scss',
  templateUrl: './product-list.html',
  standalone: true
})
export class ProductList {
   customerService = inject(CustomerService);
   route = inject(ActivatedRoute);
   products = signal<Productss[]>([]);

   categorys = signal<Category[]>([]);
   brands = signal<Brands[]>([]);
   currentSort = 'price-desc';
   total = signal<number>(0);
   isLastPage = signal<boolean>(false);

   searchQuerys = {
    searchQuery: '',
    categoryId: '',
    sortBy: 'price',
    sorOrder: -1,
    brandId: '',
    pageSize: 10,
    page: 1,
   };

   ngOnInit() {
    this.route.queryParams.subscribe((params:any) => {
      this.searchQuerys.categoryId = params['categoryId'] || '';
      this.searchQuerys.brandId = params['brandId'] || '';
      this.searchQuerys.searchQuery = params['searchQuery'] || params['search'] || '';
      this.getProducts();
    });

    this.getCategories();
    this.getBrands();
   }

   getProducts() {
    this.customerService.getProducts(this.searchQuerys).subscribe((result: any) => {
      console.log('getProducts result:', result);
      const items = Array.isArray(result) ? result : (result?.products || result?.data || result?.items || []);
      this.products.set(items);

      if (result && typeof result.total === 'number') {
        this.total.set(result.total);
        this.isLastPage.set(this.searchQuerys.page * this.searchQuerys.pageSize >= result.total);
      } else {
        this.isLastPage.set(items.length < this.searchQuerys.pageSize);
      }
    });
   }

   nextPage() {
    if (!this.isLastPage()) {
      this.searchQuerys.page++;
      this.getProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
   }

   prevPage() {
    if (this.searchQuerys.page > 1) {
      this.searchQuerys.page--;
      this.getProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
   }

   get totalPages(): number {
    return this.total() > 0 ? Math.ceil(this.total() / this.searchQuerys.pageSize) : 0;
   }

   onCategoryChange(id: string) {
    this.searchQuerys.categoryId = id;
    this.searchQuerys.page = 1;
    this.getProducts();
   }

   onBrandChange(id: string) {
    this.searchQuerys.brandId = id;
    this.searchQuerys.page = 1;
    this.getProducts();
   }

   onSortChange(value: any) {
    console.log('Sort value:', value);
    this.searchQuerys.sortBy = 'price';
    this.searchQuerys.sorOrder = Number(value);
    this.searchQuerys.page = 1;
    this.getProducts();
   }

   clearFilters() {
    this.searchQuerys.categoryId = '';
    this.searchQuerys.brandId = '';
    this.searchQuerys.searchQuery = '';
    this.searchQuerys.page = 1;
    this.getProducts();
   }

   get hasActiveFilters(): boolean {
    return !!(this.searchQuerys.categoryId || this.searchQuerys.brandId || this.searchQuerys.searchQuery);
   }

   getCategoryName(id: string): string {
    return this.categorys().find((c) => c._id === id)?.name || '';
   }

   getBrandName(id: string): string {
    return this.brands().find((b) => b._id === id)?.name || '';
   }

   getCategories(){
    this.customerService.getCategories().subscribe(result => {
      this.categorys.set(result);
    });
   }

   getBrands(){
    this.customerService.getBrands().subscribe(result => {
      this.brands.set(result);
    });
   }
}
