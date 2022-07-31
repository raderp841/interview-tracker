import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private userService: UserService, public router: Router){}

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

    this.router.navigate(['/auth']);
    // this.userService.addUser('im_a_user');
  }

  goHome = () =>  this.router.navigate(['/home']);
}
