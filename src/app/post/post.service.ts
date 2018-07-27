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
  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{ message: string; posts: Post[] }>(`/api/posts`).subscribe(
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
    this.http.post<{ message: string; postId: string }>("/api/posts", postData).subscribe(responseData => {
      const postId = responseData.postId;
      postData._id = postId;
      this.posts.push(postData);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(post: Post) {
    this.http.delete("/api/posts/" + post._id).subscribe(
      () => {
        const updatedPosts = this.posts.filter(postdata => postdata._id !== post._id);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      },
      err => {
        console.error(err);
      }
    );
  }
}
