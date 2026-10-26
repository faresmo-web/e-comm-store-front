import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Productss } from '../types/product';
import { Category } from '../types/category';

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

}
