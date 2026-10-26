import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Categories } from './components/manage/categories/categories';
import { CategoryForm } from './components/manage/category-form/category-form';
import { Brands } from './components/manage/brands/brands';
import { BrandForm } from './components/manage/brand-form/brand-form';
import { Products } from './components/manage/products/products';
import { ProductsForm } from './components/manage/products-form/products-form';
import { ProductList } from './components/product-list/product-list';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { authGaurd } from './core/auth-guard';
import { AdminDashbaord } from './components/manage/admin-dashbaord/admin-dashbaord';
import { adminGaurd } from './core/admin-guard';
import { CustomerProfile } from './components/customer-profile/customer-profile';

export const routes: Routes = [
    {
        path: "",
        component: Home,
        canActivate:[authGaurd]
    },
    {
        path: "admin",
        component: AdminDashbaord,
        canActivate:[adminGaurd]
    },
    {
        path: "admin/categories",
        component: Categories,
        canActivate:[adminGaurd]
    },
    {
        path: "admin/categories/add",
        component: CategoryForm,
        canActivate:[adminGaurd]
    },
    {
        path: "admin/categories/:id",
        component: CategoryForm,
        canActivate:[adminGaurd]
    },
    {
        path: "admin/brand",
        component: Brands,
        canActivate:[adminGaurd]
    },
    {
        path: "admin/brand/add",
        component: BrandForm,
        canActivate:[adminGaurd]
    },
    {
        path: "admin/brand/:id",
        component: BrandForm,
        canActivate:[adminGaurd]
    },
    {
        path: "admin/products",
        component: Products,
        canActivate:[adminGaurd]
    },
    {
        path: "admin/products/add",
        component: ProductsForm,
        canActivate:[adminGaurd]
    },
    {
        path: "admin/products/:id",
        component: ProductsForm,
        canActivate:[adminGaurd]
    },
    {
        path: "prudcts",
        component: ProductList,
        canActivate:[authGaurd]
    },
    {
        path: "prudcts/:id",
        component: ProductList,
        canActivate:[authGaurd]
    },
     {
        path: "profile",
        component: CustomerProfile,
        canActivate:[authGaurd]
    },
    {
        path: "register",
        component: Register,
        
    },  
    {
        path: "login",
        component: Login,
        
    }
    
];
