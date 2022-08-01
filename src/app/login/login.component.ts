import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { RoutingService } from '../services/routing.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user : User | undefined;
  userSub : Subscription | undefined;
  userTakenSub : Subscription | undefined;
  isLogin : boolean = false;
  isLoginSub : Subscription | undefined;
  isRegistration = true;
  userTaken = false;

  constructor(private userService: UserService, private routingService: RoutingService){}
  ngOnInit(): void {
    this.isLoginSub = this.routingService
      .getIsLoginListener()
      .subscribe((isLogin : boolean) => {
        this.isLogin = isLogin;
      })

    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((user : User) => {
        if(!!user){
          this.routingService.switchToHome();
        }
        this.user = user;
      });

    this.userTakenSub = this.userService
      .getUserTakenSubListener()
      .subscribe((userTaken : boolean) => this.userTaken = userTaken);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.isLoginSub?.unsubscribe();
    this.userTaken = false;
  }

  handleUserForm = (userForm: NgForm, isRegistration: boolean) => {
    if(userForm.invalid) return;
    if(isRegistration){
      this.userService.addUser(userForm.value.username.trim());
      return;
    }else{
      //attmpt to login
      this.userService.getUser(userForm.value.username.trim());
    }
  }

  handleLoginRegisterFlip = () => {
    this.isRegistration = !this.isRegistration;
  }

  handleCancelClick = () => {
    this.routingService.switchToHome();
  }

}
