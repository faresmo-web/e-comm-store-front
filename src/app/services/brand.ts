import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Brands } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class Brand {
     http = inject(HttpClient);
    baseUrl = environment.apiUrl;

      getBrands(){
            return this.http.get<Brands[]>(`${this.baseUrl}/brand`);
        }
    
        getBrandById(id: string){
        return this.http.get<Brands>(`${this.baseUrl}/brand/${id}`);
        }
    
        addBrands(name: string){
            return this.http.post<Brands>(`${this.baseUrl}/brand`, {name : name});
        }
    
        updateBrand(id: string, name: string){   
            return this.http.put<Brands>(`${this.baseUrl}/brand/${id}`, {name:name});
        }
    
        deleteBrand(id: string){
            return this.http.delete<Brands>(`${this.baseUrl}/brand/${id}`);
        }
}
