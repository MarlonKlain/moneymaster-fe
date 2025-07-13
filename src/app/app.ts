import { Component } from '@angular/core';
import {LoginComponent } from './auth/login/login';
@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'moneymaster-fe';
}
