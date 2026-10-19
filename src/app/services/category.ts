import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from '../types/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;

    getCategories(){
        return this.http.get<Category[]>(`${this.baseUrl}/category`);
    }

    getCategoryById(id: string){
    return this.http.get<Category>(`${this.baseUrl}/category/${id}`);
    }

    createCategory(name: string){
        return this.http.post<Category>(`${this.baseUrl}/category`, {name : name});
    }

    updateCategory(id: string, name: string){   
        return this.http.put(`${this.baseUrl}/category/${id}`, {name:name});
    }

    deleteCategory(id: string){
        return this.http.delete(`${this.baseUrl}/category/${id}`);
    }
}

export { CategoryService as Category };
