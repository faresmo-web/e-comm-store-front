import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Category } from '../../types/category';
import { CategoryService } from '../../services/category';
import { Auth } from '../../services/auth';
import { CustomerService } from '../../services/customer';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  imports: [
    MatIcon,
    RouterLink,
    FormsModule,
  ],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  customerService = inject(CustomerService);
  categorieList = signal<Category[]>([]);
  authService = inject(Auth);
  router = inject(Router);
  searchQuery!: string;

  selectedCategoryId = signal<string>('');
  isHomePage = signal<boolean>(true);

  ngOnInit() {
    this.getCategories();
    this.updateActiveCategory();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveCategory();
      });
  }

  updateActiveCategory() {
    try {
      const urlTree = this.router.parseUrl(this.router.url);
      const categoryId = urlTree.queryParams['categoryId'] || '';
      this.selectedCategoryId.set(categoryId);

      const pathname = this.router.url.split('?')[0];
      this.isHomePage.set(pathname === '/' || pathname === '');
    } catch {
      this.selectedCategoryId.set('');
      this.isHomePage.set(true);
    }
  }

  getCategories() {
    this.customerService.getCategories().subscribe((result: Category[]) => {
      this.categorieList.set(result);
    });
  }

  onSearch(e:any){
    if(e.target.value){
      this.router.navigateByUrl("/prudcts?search="+e.target.value)
    }
  }
  searchCatrgory(id:string){
    this.searchQuery = ""
    this.router.navigateByUrl("/prudcts?categoryId="+id)
  }


  logout(){
    this.authService.logout()
    this.router.navigateByUrl("/login")
  }
}
   

