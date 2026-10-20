import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../services/product';
import {MatSelectModule} from '@angular/material/select';
import { Brand } from '../../../services/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category';
import { Brands } from '../../../types/brand';
import { Productss } from '../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatSelectModule
  ],
  selector: 'app-products-form',
  styleUrl: './products-form.scss',
  templateUrl: './products-form.html',  
})
export class ProductsForm {
  formBuilder = inject(FormBuilder);
   productService = inject(Product);
   categoryService = inject(CategoryService);
   brandService = inject(Brand);
   router = inject(Router);
   route = inject(ActivatedRoute)

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shotDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],

  })
  brands:Brands[] =[]
  categories:Category[] =[]

  id!:string

  ngOnInit(){
   
    this.getCategories()
    this.getBrands()
    // this.addProduct()

    this.id = this.route.snapshot.params['id']
    console.log(this.id)

    if(this.id){
      this.productService.getProductById(this.id).subscribe((result:Productss) => {
        for (let image of result.images){
          this.addImage()
        }
        this.productForm.patchValue(result as any)
      })
    }else{
       this.addImage()
    }


  }

  getCategories(){
    this.categoryService.getCategories().subscribe((result:Category[]) => {
      this.categories = result;
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe((result:Brands[]) => {
      this.brands = result;
    })
  }


  get images(){
    return this.productForm.get('images') as FormArray
  }

  addImage(){
    this.images.push(this.formBuilder.control(null))
  }
removeImage(){
  this.images.removeAt(this.images.length - 1)
}

  addProduct(){

    let value = this.productForm.value
    
    console.log(this.productForm.value)

    this.productService.addProduct(value as any).subscribe((result) => {
      alert("Product added successfully")
      this.productForm.reset()
      this.router.navigate(['/admin/products'])
    })

  }

  updateProduct(){
    let value = this.productForm.value
    this.productService.updateProduct(this.id, value as any).subscribe(result => {
      alert("Product updated successfully")
      this.productForm.reset()
      this.router.navigate(['/admin/products'])
    })
  }
}
