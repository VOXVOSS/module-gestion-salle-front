import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  passwordData = { oldPassword: '', newPassword: '' };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.changePassword(this.passwordData).subscribe({
      next: (response) => {
        console.log('Password changed successfully:', response);
        // Handle success, e.g., navigate or show a success message
      },
      error: (error) => {
        console.error('Password change failed:', error);
        // Handle failure, e.g., display an error message
      },
    });
  }
}
