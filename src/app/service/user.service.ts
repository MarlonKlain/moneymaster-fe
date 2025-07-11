import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core"; 
import { Observable } from "rxjs";

export interface user {
        id: string;
        firstName : string;
        lastName: string;
        username: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    // Injecting the httpClient dependency
    // private because the dependency wont be access directly by the components, it will be accessed by the methods below
    // readOnly because we wont change anything on HttpClient dependency, we will only read and request.
    private readonly _httpClient = inject(HttpClient)

    getUsers(userId: string): Observable<user>{
        return this._httpClient.get<user>(`http://localhost:8080/api/user/${userId}`)
    }

}