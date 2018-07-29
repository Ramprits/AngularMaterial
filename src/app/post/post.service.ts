import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject } from "rxjs";
import { Post } from "@app/post/post.model";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  constructor(private _httpClient: HttpClient) {}

  getPosts() {
    this._httpClient.get<{ message: string; posts: Post[] }>(`/api/posts`).subscribe(
      postData => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]);
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 404) {
            console.error("Post doesn't found with status code : ", error.status);
          }
        }
      },
      () => {}
    );
  }
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
  addPost(postData: Post) {
    this._httpClient.post<{ message: string; postId: string }>("/api/posts", postData).subscribe(responseData => {
      const postId = responseData.postId;
      postData._id = postId;
      this.posts.push(postData);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(id: string) {
    this._httpClient.delete<{ message: string }>("/api/posts/" + id).subscribe(
      res => {
        const updatedPosts = this.posts.filter(post => post._id !== id);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
        console.log(res.message);
      },
      err => {
        console.error(err);
      }
    );
  }
}
