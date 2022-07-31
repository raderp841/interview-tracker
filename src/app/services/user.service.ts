import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model'
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUpdated = new Subject<User>()
  constructor(private http: HttpClient, private routingService: RoutingService){}
  private user : any;

  getCurrentUserId = () => {
    return this.user._id;
  }

  getUser(user_name: string) {
    const params = {user_name};
    this.http.get<{message: string, user: User}>(`http://localhost:3000/api/user?${new URLSearchParams(params).toString()}`)
      .subscribe((userData) => {
        console.log(userData.message);
        console.log(userData.user);
        this.user = userData.user;

        const user : User = {
          _id: null,
          user_name
        }
        console.log(this.user);
        setTimeout(() => {
          this.userUpdated.next({...user});
        }, 0);
        console.log('i updated the user');
        this.routingService.switchToHome();
      });
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  addUser(user_name : string){
    const user : User = {
      _id: null,
      user_name
    }

    this.http.post<{message: string}>('http://localhost:3000/api/user', user)
      .subscribe((userData) => {
        console.log(userData.message);
        this.user = user;
        this.routingService.switchToHome();
        this.userUpdated.next({...this.user});
        this.getUser(user.user_name);
      });
  }

  logoutUser() {
    this.user = undefined
    this.userUpdated.next(this.user);
    this.routingService.switchToHome();
  }
}
