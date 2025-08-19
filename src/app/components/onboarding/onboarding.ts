import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroDocumentCurrencyDollarSolid } from '@ng-icons/heroicons/solid';
import { heroArchiveBoxArrowDownSolid } from '@ng-icons/heroicons/solid';
import { heroPresentationChartLineSolid } from '@ng-icons/heroicons/solid';
import { OnboardingService } from '../../services/onboarding.service';

interface OnboardingSlide {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-onboarding',
  imports: [NgIcon, CommonModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
  viewProviders: [
    provideIcons({
      heroDocumentCurrencyDollarSolid,
      heroArchiveBoxArrowDownSolid,
      heroPresentationChartLineSolid,
    }),
  ],
})
export class Onboarding {
  private readonly router = inject(Router);
  private readonly OnboardingService = inject(OnboardingService);

  currentSlide: number = 0;

  slides: OnboardingSlide[] = [
    {
      icon: 'heroDocumentCurrencyDollarSolid',
      title: 'Set Your Income',
      description:
        'Start by entering your total monthly income. This is the foundation of your financial plan.',
    },
    {
      icon: 'heroArchiveBoxArrowDownSolid',
      title: 'Define Categories',
      description:
        'Allocate your income into percentage-based categories like "Needs," "Wants," and "Savings."',
    },
    {
      icon: 'heroPresentationChartLineSolid',
      title: 'Track Your Plan',
      description:
        "Add fixed costs like rent. We'll show you your remaining flexible spending in each category.",
    },
  ];

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  nextSlide() {
    if (this.currentSlide + 1 === this.slides.length) {
      this.OnboardingService.completeOnboarding().subscribe({
        next: (response) => {
          console.log('Onboarding completado com sucesso!', response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
}
