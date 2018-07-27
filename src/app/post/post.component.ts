import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "@app/post/post.model";
import { Subscription } from "rxjs";
import { PostService } from "@app/post/post.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isEdit = false;
  private postSub: Subscription;

  constructor(private _ps: PostService) {}

  ngOnInit() {
    this._ps.getPosts();
    this.postSub = this._ps.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  AddPost() {
    this.isEdit = !this.isEdit;
  }
  onSavePost(postData: Post) {
    this._ps.addPost(postData);
    this.isEdit = false;
  }
  onDelete(postId: Post) {
    this._ps.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
