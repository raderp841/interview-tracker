import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  newClicked = false;

  ngOnInit(): void {
  }

  handleNewClick = () => this.newClicked = true;
  handleCancelClick = () => this.newClicked = false;

  constructor(public postsService: PostsService){};

  onAddPost(form: NgForm){
    if(form.invalid) return;
    this.postsService.addPost(form.value.title, form.value.content);
    this.handleCancelClick();
    form.resetForm();
  }
}
