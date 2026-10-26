import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { Auth } from '../../services/auth';

@Component({
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatAnchor
],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  fb = inject(FormBuilder);
   authService = inject(Auth);
   router = inject(Router)

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  login(){
    if (this.loginForm.invalid) return;
    let value = this.loginForm.value;
    this.authService.login(value.email!, value.password!).subscribe({
      next: (result: any) => {
        alert("Login successfully");
        this.authService.setSession(result.token, result.user);
        this.router.navigateByUrl("/");
      },
      error: (err: any) => {
        alert(err.error?.message || "Login failed");
      }
    });
  }
  
}
