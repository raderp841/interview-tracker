import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../..//environments/environment';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

const BACKEND_URL = environment.apiUrl + 'posts/'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient, private userService: UserService){}

  private posts : Post[] = [];

  getPosts() {
    const user_id : string | undefined = this.userService.getCurrentUserId();
    if(user_id == undefined) return;
    const params = {user_id};
    this.http.get<{message: string, posts: Post[]}>(BACKEND_URL + '?' + new URLSearchParams(params))
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(post_id: string) {
    this.http.post<{message: string}>(BACKEND_URL + 'delete', {post_id})
      .subscribe((responseData) => {
        this.posts = this.posts.filter(p => p._id != post_id);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {
      _id: null,
      title,
      content,
      subposts: null,
      parentPost: null,
      notes: null,
      createdDate: null,
      dueDate: null,
      user_id: this.userService.getCurrentUserId()
    };

    this.http.post<{post: Post, message: string}>(BACKEND_URL + 'new', post)
      .subscribe((responseData) => {
        this.posts.push(responseData.post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
