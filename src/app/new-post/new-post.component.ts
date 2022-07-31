import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  newClicked = false;

  user : User | undefined;
  private userSub: Subscription | undefined;

  ngOnInit(): void {
    this.userSub = this.userService
    .getUserUpdateListener()
    .subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  handleNewClick = () => this.newClicked = true;
  handleCancelClick = () => this.newClicked = false;

  constructor(public postsService: PostsService, private userService: UserService){};

  onAddPost(form: NgForm){
    if(form.invalid) return;
    this.postsService.addPost(form.value.title, form.value.content);
    this.handleCancelClick();
    form.resetForm();
  }
}
