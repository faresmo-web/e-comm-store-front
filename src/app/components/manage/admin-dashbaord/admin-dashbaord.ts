import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';

@Component({
  imports: [
    MatBadgeModule,
    RouterLink,
    MatAnchor
],
  selector: 'app-admin-dashbaord',
  styleUrl: './admin-dashbaord.scss',
  templateUrl: './admin-dashbaord.html',
})
export class AdminDashbaord {}
