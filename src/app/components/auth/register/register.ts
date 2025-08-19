import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomInput } from '../../shared/custom-input/custom-input';
import { user } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CustomInput],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  userCredentials!: Omit<user, 'hasCompletedOnboarding' | 'token'>;
  readonly userService = inject(AuthService);

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.nullValidator,
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.nullValidator,
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.nullValidator,
      Validators.required,
      Validators.email,
    ]),
    username: new FormControl('', [
      Validators.nullValidator,
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.nullValidator,
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.nullValidator,
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  register() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.errors);
    console.log(this.registerForm.status);
    if (this.registerForm.invalid) {
      throw new Error('INVALID CREDENTIALS');
    }

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      throw new Error('Password does not matches.');
    }

    this.userCredentials = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    };

    this.userService.userRegister(this.userCredentials).subscribe({
      next(response) {
        console.log('Login successful!. ', response);
      },
      error(err) {
        console.log('Login error. ', err);
      },
      complete() {
        console.log('Login request complete.');
      },
    });
  }
}
