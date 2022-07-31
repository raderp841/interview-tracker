import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private isLogin = new Subject<boolean>();
  private isShowPosts = new Subject<boolean>();
  constructor(){}

  getIsLoginListener() {
    return this.isLogin.asObservable();
  }

  getIsShowPostsListener() {
    return this.isShowPosts.asObservable();
  }

  switchToLogin = () => this.isLogin.next(true);
  switchToHome = (showPosts: boolean = false) => {
    this.isLogin.next(false);
    this.isShowPosts.next(showPosts);
  }
}
