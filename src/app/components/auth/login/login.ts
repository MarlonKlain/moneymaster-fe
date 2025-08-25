import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { user } from '../../../models/user.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomButton } from '../../shared/custom-button/custom-button';
import { CustomInput } from '../../shared/custom-input/custom-input';
import { CentralCard } from '../../shared/central-card/central-card';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CustomButton, CustomInput, CentralCard],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  // $ is a convention when using observables
  // ! is telling to TS that, besides not declared yet, it will receives a value before it be used.
  // user$!: Observable<user>;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.nullValidator, Validators.required]),
    password: new FormControl('', [
      Validators.nullValidator,
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.nullValidator,
      Validators.required,
    ]),
  });

  readonly userService = inject(AuthService);

  userLogin() {
    if (!this.loginForm.value.username || !this.loginForm.value.password) {
      console.log('All fields are required');
      return;
    } else {
      const userCredentials: Pick<user, 'username' | 'password'> = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this.userService.userLogin(userCredentials).subscribe({
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
}
