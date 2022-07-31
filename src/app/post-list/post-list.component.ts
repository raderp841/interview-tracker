import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts : Post[] = [];
  user : User | undefined;
  private postsSub: Subscription | undefined;
  private userSub : Subscription | undefined;
  constructor(private postService: PostsService, private userService: UserService) { }

  ngOnInit(): void {

    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((user: User) => {
        this.user = user;
      })

    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.postService.getPosts();
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }

}
