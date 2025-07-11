import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Userauth } from "./components/userauth/userauth";

@Component({
  selector: 'app-root',
  imports: [Userauth],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'moneymaster-fe';
}
