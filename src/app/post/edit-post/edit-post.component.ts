import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Post } from "@app/post/post.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"]
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;
  @Output() addPost = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {
    this.postForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      body: new FormControl("", [Validators.required]),
      createdDate: new FormControl(new Date())
    });
  }

  onPostSave(postData: Post) {
    this.addPost.emit(postData);
    this.router.navigate(["/post"]);
  }
}
