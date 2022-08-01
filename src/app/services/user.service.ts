import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model'
import { RoutingService } from './routing.service';

const BACKEND_URL = environment.apiUrl + 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUpdated = new Subject<User>();
  private userTakenChange = new Subject<boolean>();
  constructor(private http: HttpClient, private routingService: RoutingService){}
  private user : any;
  private userTaken = false;

  getCurrentUserId = () => {
    return this.user?._id;
  }

  getUser(user_name: string) {
    const params = {user_name};
    this.http.get<{message: string, user: User}>(BACKEND_URL + `?${new URLSearchParams(params).toString()}`)
      .subscribe((userData) => {
        this.user = userData.user;

        const user : User = {
          _id: null,
          user_name
        }
        setTimeout(() => {this.userUpdated.next({...user});}, 0);
        this.routingService.switchToHome();
      });
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  getUserTakenSubListener() {
    return this.userTakenChange.asObservable();
  }

  addUser(user_name : string){
    const user : User = {
      _id: null,
      user_name
    }

    this.http.post<{user:User}>(BACKEND_URL, user)
      .subscribe(
        (userData) => {
          this.user = userData.user;
          this.routingService.switchToHome();
          setTimeout(() => {this.userUpdated.next({...this.user})}, 0);
          this.userTaken = false;
          this.userTakenChange.next(this.userTaken);
        },
        err => {
          this.userTaken = true;
          this.userTakenChange.next(this.userTaken);
        }
      );
  }

  logoutUser() {
    this.user = undefined
    this.userUpdated.next(this.user);
    this.routingService.switchToHome();
  }
}
