import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts : Post[] = [];
  private postsSub: Subscription | undefined;
  constructor(public postService: PostsService) { }

  ngOnInit(): void {

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
