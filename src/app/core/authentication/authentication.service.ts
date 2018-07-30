import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface UserModel {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;
  private authListner = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {}

  login1(email: string, password: string) {
    const loginModel: UserModel = { email: email, password: password };
    this.httpClient.post<{ token: string }>("/api/users/login", loginModel).subscribe(res => {
      const token = res.token;
      this.token = token;
      console.log(this.token);
      this.authListner.next();
    });
  }

  signup(email: string, password: string) {
    const userModel: UserModel = { email: email, password: password };
    this.httpClient.post("/api/users/signup", userModel).subscribe(res => {
      console.log(res);
    });
  }
  logout() {
    // Customize credentials invalidation here
  }

  isAuthenticated(): boolean {
    return true;
  }
  getAuthStatusListner() {
    return this.authListner.asObservable();
  }
  getToken() {
    return this.token;
  }
}
