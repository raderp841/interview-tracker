import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { PostsService } from '../services/posts.service';
import { RoutingService } from '../services/routing.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts : Post[] = [];
  user : User | undefined;
  showPosts : boolean = false;
  private postsSub: Subscription | undefined;
  private userSub : Subscription | undefined;
  private showPostsSub : Subscription | undefined;
  constructor(
    private postService: PostsService,
    private userService: UserService,
    private routingService: RoutingService) { }

  ngOnInit(): void {

    this.userSub = this.userService
    .getUserUpdateListener()
    .subscribe((user: User) => {
      this.user = user;
    });

    this.showPostsSub = this.routingService
      .getIsShowPostsListener()
      .subscribe((showPosts : boolean) => {
        this.showPosts = showPosts;
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
    this.userSub?.unsubscribe();
    this.showPostsSub?.unsubscribe();
  }

}
