import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectTrigger, MatOption } from '@angular/material/select';
import {MatSelectModule} from '@angular/material/select';


@Component({
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectTrigger,
    MatOption,
    MatSelectModule
],
  selector: 'app-category-form',
  styleUrl: './category-form.scss',
  templateUrl: './category-form.html',
})
export class CategoryForm {
  name!: string
  isEdit = false;
  id!: string;
  categroyService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);


  ngOnInit(){

    this.id = this.route.snapshot.params["id"];
    console.log(this.id)
    if(this.id){
      this.isEdit = true;
      this.categroyService.getCategoryById(this.id).subscribe((result:any) => {
        console.log(result);
        this.name = result.name;
      })
    }
  }
  add() {
    console.log(this.name)
    this.categroyService.createCategory(this.name).subscribe((result:any) => {
      alert("Category Added Successfully ")
      this.router.navigateByUrl("admin/categories")
    })
  }
  update(){
     console.log(this.name)
      this.categroyService.updateCategory(this.id,this.name).subscribe((result:any) => {
      alert("Category Updated Successfully ")
      this.router.navigateByUrl("admin/categories")
    })
  }
}
