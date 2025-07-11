import { Component, inject } from '@angular/core';
import { user, UserService } from '../../service/user.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-userauth',
  imports: [],
  templateUrl: './userauth.html',
  styleUrl: './userauth.css'
})
export class Userauth {
  
  userId: string = "1cc11272-0f53-4383-bf77-cd64267f095a"
  user: user = {
    id: "",
    firstName: "",
    lastName: "",
    username: ""
  };

  readonly _userService = inject(UserService)


  ngOnInit(){
    this._userService.getUsers(this.userId).subscribe(
      (response) => {console.log("RESPONSE: ", response)
        this.user = response;
      }
    )
  }
}
