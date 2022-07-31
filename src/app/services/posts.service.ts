import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient, private userService: UserService){}

  private posts : Post[] = [];

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    console.log(this.userService.getCurrentUserId());
    const post: Post = {
      id: null,
      title,
      content,
      subposts: null,
      parentPost: null,
      notes: null,
      createdDate: null,
      dueDate: null,
      user_id: this.userService.getCurrentUserId()
    };

    this.http.post<{message: string}>('http://localhost:3000/api/posts/new', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
