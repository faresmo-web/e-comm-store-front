import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Categories } from './components/manage/categories/categories';
import { CategoryForm } from './components/manage/category-form/category-form';
import { Brands } from './components/manage/brands/brands';
import { BrandForm } from './components/manage/brand-form/brand-form';
import { Products } from './components/manage/products/products';
import { ProductsForm } from './components/manage/products-form/products-form';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "admin/categories",
        component: Categories
    },
    {
        path: "admin/categories/add",
        component: CategoryForm
    },
    {
        path: "admin/categories/:id",
        component: CategoryForm
    },
    {
        path: "admin/brand",
        component: Brands
    },
    {
        path: "admin/brand/add",
        component: BrandForm
    },
    {
        path: "admin/brand/:id",
        component: BrandForm
    },
    {
        path: "admin/products",
        component: Products
    },
    {
        path: "admin/products/add",
        component: ProductsForm
    },
    {
        path: "admin/products/:id",
        component: ProductsForm
    },
];
