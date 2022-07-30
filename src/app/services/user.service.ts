import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUpdated = new Subject<User>()
  constructor(private http: HttpClient){}
  private user : User | undefined;


  getUser(user_name: string) {
    this.http.get<{message: string, user: User}>(`http://localhost:3000/api/user?${new URLSearchParams(user_name)}`)
      .subscribe((userData) => {
        this.user = userData.user;
        this.userUpdated.next({...this.user});
      });
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  addUser(user_name : string){
    const user : User = {
      id: null,
      user_name
    }

    this.http.post<{message: string}>('http://localhost:3000/api/user', user)
      .subscribe((userData) => {
        console.log(userData.message);
        this.user = user;
        this.userUpdated.next({...user});
      });
  }
}
