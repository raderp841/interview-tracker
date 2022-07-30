import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient){}

  private posts : Post[] = [
    {id: null, title: 'post one', content: 'this is post one', createdDate: null, dueDate: null, notes: null, parentPost: null, subposts: null},
    {id: null, title: 'post two', content: 'this is post two', createdDate: null, dueDate: null, notes: null, parentPost: null, subposts: null},
    {id: null, title: 'post three', content: 'this is post three', createdDate: null, dueDate: null, notes: null, parentPost: null, subposts: null}
  ];

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
    const post: Post = {
      id: null,
      title,
      content,
      subposts: null,
      parentPost: null,
      notes: null,
      createdDate: null,
      dueDate: null
    };

    this.http.post<{message: string}>('http://localhost:3000/api/posts/new', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
