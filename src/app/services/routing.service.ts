import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
