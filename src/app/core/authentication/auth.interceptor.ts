import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "@app/core/authentication/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServoce: AuthenticationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authServoce.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
