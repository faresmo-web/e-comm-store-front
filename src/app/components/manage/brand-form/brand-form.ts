import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Brand } from '../../../services/brand';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [
    MatInputModule,
    MatAnchor,
    FormsModule
],
  selector: 'app-brand-form',
  styleUrl: './brand-form.scss',
  templateUrl: './brand-form.html',
})
export class BrandForm {
  name!: String;
   brandService = inject(Brand);
   router = inject(Router);
   route = inject(ActivatedRoute)
   id!: string

   ngOnInit(){
    this.id = this.route.snapshot.params["id"]
    this.brandService.getBrandById(this.id).subscribe(result => {
      this.name = result.name
    })
   }
   
  

  add(){
    this.brandService.addBrands(this.name as string).subscribe( result => {
      alert("Brand added successfully");
      this.router.navigateByUrl("admin/brand")
    })
  }
  update(){
    console.log(this.name)
      this.brandService.updateBrand(this.id,this.name as string).subscribe((result:any) => {
      alert("Brand Updated Successfully ")
      this.router.navigateByUrl("admin/brand")
    })
  }
  }

