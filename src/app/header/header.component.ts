import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  userSub : Subscription | undefined;
  user : User | undefined;
  constructor(public userService: UserService){}

  ngOnInit(): void {

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
      return;
    }

    this.userService.addUser('im_a_user');
  }
}
