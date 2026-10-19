import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Categories } from './components/manage/categories/categories';
import { CategoryForm } from './components/manage/category-form/category-form';

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
];
