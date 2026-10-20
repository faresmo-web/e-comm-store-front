import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Productss } from '../types/product';

@Service()
export class Product {
     http = inject(HttpClient);
    baseUrl = environment.apiUrl;

    getProduct(){
        return this.http.get<Productss[]>(`${this.baseUrl}/product`);
    }
    getProductById(id: string){
        return this.http.get<Productss>(`${this.baseUrl}/product/${id}`);
    }

    addProduct(product: Productss){
        return this.http.post<Productss>(`${this.baseUrl}/product`, product);
    }

    updateProduct(id: string, product: Productss){   
        return this.http.put<Productss>(`${this.baseUrl}/product/${id}`, product);
    }

    deleteProduct(id: string){
        return this.http.delete<Productss>(`${this.baseUrl}/product/${id}`);
    }

}
