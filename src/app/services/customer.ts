import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Productss } from '../types/product';
import { Category } from '../types/category';
import { Brands } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    http = inject(HttpClient);

    baseUrl = environment.apiUrl;
    

    getNewProducts(){
         return this.http.get<Productss[]>(`${this.baseUrl}/customer/new-products`);
    }

    getFeaturedProducts(){
         return this.http.get<Productss[]>(`${this.baseUrl}/customer/featured-products`);
    }

    getCategories(){
         return this.http.get<Category[]>(`${this.baseUrl}/customer/categories`);
    }

    getBrands(){
         return this.http.get<Brands[]>(`${this.baseUrl}/customer/brands`);
    }
    

    getProducts(searchQuerys: {
      searchQuery?: string;
      categoryId?: string;
      sortBy?: string;
      sort?: string;
      sorOrder?: number;
      brandId?: string;
      pageSize?: number;
      page?: number;
    }) {
      const params: string[] = [];
      if (searchQuerys.searchQuery) params.push(`searchQuery=${encodeURIComponent(searchQuerys.searchQuery)}`);
      if (searchQuerys.categoryId) params.push(`categoryId=${encodeURIComponent(searchQuerys.categoryId)}`);
      if (searchQuerys.brandId) params.push(`brandId=${encodeURIComponent(searchQuerys.brandId)}`);
      
      const sortVal = searchQuerys.sortBy || searchQuerys.sort;
      if (sortVal) {
        params.push(`sortBy=${encodeURIComponent(sortVal)}`);
        params.push(`sort=${encodeURIComponent(sortVal)}`);
      }
      if (searchQuerys.sorOrder !== undefined) {
        params.push(`sorOrder=${searchQuerys.sorOrder}`);
      }
      if (searchQuerys.pageSize) params.push(`pageSize=${searchQuerys.pageSize}`);
      if (searchQuerys.page) params.push(`page=${searchQuerys.page}`);

      const queryStr = params.length ? `?${params.join('&')}` : '';
      return this.http.get<Productss[]>(`${this.baseUrl}/customer/products${queryStr}`);
    }

    getProductById(id: string){
         return this.http.get<Productss>(`${this.baseUrl}/customer/products/${id}`);
    }

}
