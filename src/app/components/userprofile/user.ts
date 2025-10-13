import { AsyncPipe, CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserProfileInformation } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import {
  heroArrowDownTraySolid,
  heroArrowLeftSolid,
  heroArrowLeftStartOnRectangleSolid,
} from '@ng-icons/heroicons/solid';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alerts.service';

@Component({
  selector: 'app-user',
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule, NgIcon],
  templateUrl: './user.html',
  styleUrl: './user.scss',
  viewProviders: [
    provideIcons({
      heroArrowDownTraySolid,
      heroArrowLeftSolid,
      heroArrowLeftStartOnRectangleSolid,
    }),
  ],
})
export class UserComponent {
  private readonly userService = inject(UserService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly location = inject(Location);
  private readonly authService = inject(AuthService);
  private readonly alert = inject(AlertService);

  userInformation$!: Observable<UserProfileInformation>;
  userInformationForm: FormGroup = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    username: [''],
  });

  ngOnInit() {
    this.loadUserInformation();
    this.disableInput();
  }

  loadUserInformation(): void {
    this.userInformation$ = this.userService.getUserInformation();
    this.populateForm();
  }

  populateForm(): void {
    this.userInformation$.subscribe({
      next: (userProfileInformation) => {
        console.log('User information: ', userProfileInformation);
        this.userInformationForm.patchValue({
          firstName: userProfileInformation.firstName,
          lastName: userProfileInformation.lastName,
          email: userProfileInformation.email,
          username: userProfileInformation.username,
        });
      },
    });
  }

  disableInput(): void {
    this.userInformationForm.get('firstName')?.disable();
    this.userInformationForm.get('lastName')?.disable();
    this.userInformationForm.get('email')?.disable();
  }
  onSubmit() {
    console.log(this.userInformationForm.value);
  }

  goBack(): void {
    this.location.back();
  }

  async logout(): Promise<void> {
    const isConfirmed = await this.alert.confirmAction(
      'Are you sure that you want to logout?'
    );

    if (isConfirmed) {
      this.authService.logout();
    }
  }
}
