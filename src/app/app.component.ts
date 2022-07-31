import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'interview-tracker';
  isLogin : boolean = false;
  isLoginSub : Subscription | undefined;

  constructor(private routingService : RoutingService){}

  ngOnInit(): void {
    this.isLoginSub = this.routingService
      .getIsLoginListener()
      .subscribe((isLogin: boolean) => {
        this.isLogin = isLogin;
      });
  }

  ngOnDestroy(): void {
      this.isLoginSub?.unsubscribe();
  }
}
