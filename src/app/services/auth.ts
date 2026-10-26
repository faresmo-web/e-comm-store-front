import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ 
  providedIn: 'root'
})
export class Auth {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;

    isLoggedIn = signal<boolean>(!!localStorage.getItem("token"));
    userName = signal<string | null>(this.getUserNameFromStorage());
    userEmail = signal<string | null>(this.getUserEmailFromStorage());
    isAdmin = signal<boolean | null>(this.isAdminFromStorage());
   
    private getUserNameFromStorage(): string | null {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          return JSON.parse(userData).name;
        } catch {
          return null;
        }
      }
      return null;
    }
     private getUserEmailFromStorage(): string | null {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          return JSON.parse(userData).email;
        } catch {
          return null;
        }
      }
      return null;
    }

    private isAdminFromStorage(): boolean | null {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          return JSON.parse(userData).isAdmin;
        } catch {
          return null;
        }
      }
      return null;
    }

    setSession(token: string, user: any) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.isLoggedIn.set(true);
      this.userName.set(user?.name || null);
      this.userEmail.set(user?.email || null);
      this.isAdmin.set(user?.isAdmin || null);
    }

    register(name:string, email:string, password:string){
         return this.http.post(`${this.baseUrl}/auth/register`, {
            name: name,
            email: email,
            password: password,
         });
    }

    login(email:string, password:string){
         return this.http.post(`${this.baseUrl}/auth/login`, {
            email: email,
            password: password,
         });
    }

    ligon(email:string, password:string){
         return this.login(email, password);
    }

    logout(){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.isLoggedIn.set(false);
      this.userName.set(null);
      this.userEmail.set(null);
      this.isAdmin.set(null);
    }
}
