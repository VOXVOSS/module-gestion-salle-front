import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any;
  error: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (response) => {
        this.user = response.user;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors de la récupération du profil.';
        console.error(err);
      }
    });
  }
}
