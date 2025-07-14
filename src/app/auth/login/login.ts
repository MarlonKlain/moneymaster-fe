import { Component, inject } from '@angular/core';
import { user, UserService } from '../../service/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  userId: string = "1cc11272-0f53-4383-bf77-cd64267f095a"

  // $ is a convention when using observables
  // ! is telling to TS that, besides not declared yet, it will receives a value before it be used.
  user$! : Observable<user>
  readonly userService = inject(UserService)


  ngOnInit(){
    this.user$ = this.userService.getUsers(this.userId);
    console.log(this.user$)
    this.user$.subscribe(
      response => console.log(response)
    )
  }
}
