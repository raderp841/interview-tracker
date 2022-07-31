import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user : User | undefined;
  userSub : Subscription | undefined;
  isRegistration = true;
  constructor(private userService: UserService, private router: Router){}
  ngOnInit(): void {
    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((user : User) => {
        if(!!user){
          this.router.navigate(['/home']);
        }else{
          console.log('login error');
        }
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  handleUserForm = (userForm: NgForm, isRegistration: boolean) => {
    if(userForm.invalid) return;
    if(isRegistration){
      //check if username already exists
      this.userService.addUser(userForm.value.username.trim());
      this.router.navigate(['/home']);
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
    this.router.navigate(['/home']);
  }

}
