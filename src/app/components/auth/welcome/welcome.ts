import { Component, inject } from '@angular/core';
import { CentralCard } from '../../shared/central-card/central-card';
import { CustomButton } from '../../shared/custom-button/custom-button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [CentralCard, CustomButton],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class WelcomeComponent {
  private readonly router = inject(Router);

  toLogin() {
    this.router.navigate(['/login']);
  }

  toSignUp() {
    this.router.navigate(['/register']);
  }
}
