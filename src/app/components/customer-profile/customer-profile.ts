import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  selector: 'app-customer-profile',
  styleUrl: './customer-profile.scss',
  templateUrl: './customer-profile.html',
})
export class CustomerProfile {
  isEditing = false;
  authService = inject(Auth);

  user = {
    name: this.authService.userName() || '',
    email: this.authService.userEmail() || '',
    phone: '',
    city: '',
    avatar: 'https://i.pravatar.cc/200?img=12',
    orders: 12,
    favorites: 8
  };

  private originalUser = { ...this.user };

  constructor(private router: Router) {}

  toggleEdit(): void {
    if (this.isEditing) {
      this.cancelEdit();
      return;
    }

    this.originalUser = { ...this.user };
    this.isEditing = true;
  }

  saveProfile(): void {
    if (!this.isEditing) return;

    // TODO: Send updated user data to your backend API.
    console.log('Updated profile:', this.user);

    this.originalUser = { ...this.user };
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.user = { ...this.originalUser };
    this.isEditing = false;
  }

  changePassword(): void {
    this.router.navigate(['/change-password']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
