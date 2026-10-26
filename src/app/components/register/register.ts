import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { Auth } from '../../services/auth';

@Component({
  imports: [
    FormsModule,
    RouterLink,
    MatAnchor,
    ReactiveFormsModule,
    RouterLink
],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  formbuilder = inject(FormBuilder);
  authService = inject(Auth);
  router = inject(Router)

  registerForm = this.formbuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]]
  });

  register(){
    if (this.registerForm.invalid) return;
    console.log(this.registerForm.value);
    let value = this.registerForm.value;
    this.authService.register(value.name!,value.email!,value.password!).subscribe({
      next: (result) => {
        alert("Register successfully");
        this.router.navigateByUrl("login");
      },
      error: (err) => {
        alert(err.error?.message || "Registration failed");
      }
    });
  }


  
}
