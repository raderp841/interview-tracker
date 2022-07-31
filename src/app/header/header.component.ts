import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { RoutingService } from '../services/routing.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  userSub : Subscription | undefined;
  user : User | undefined;
  isLoginSub : Subscription | undefined;
  isLogin : boolean = false;
  constructor(private userService: UserService, private routingService: RoutingService){}


  ngOnInit(): void {

    this.isLoginSub = this.routingService
      .getIsLoginListener()
      .subscribe((isLogin : boolean) => {
        this.isLogin = isLogin;
      })

    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((user: User) => {
        this.user = user;
      });
    // this.postService.getPosts();

  }

  handleLoginRegisterClick = (isLoggedIn : boolean) => {
    if(isLoggedIn){
      this.userService.logoutUser();
      this.routingService.switchToHome();
      return;
    }
    this.routingService.switchToLogin();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.isLoginSub?.unsubscribe();
  }

  goHome = () =>  {
    this.routingService.switchToHome();
  }
}
