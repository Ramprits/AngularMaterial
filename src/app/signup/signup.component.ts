import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { finalize } from "rxjs/operators";

import { environment } from "@env/environment";
import { Logger, I18nService, AuthenticationService } from "@app/core";

const log = new Logger("signup");

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  version: string = environment.version;
  error: string;
  signupForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  signup() {
    this.isLoading = true;
    this.authenticationService
      .signup(this.signupForm.value)
      .pipe(
        finalize(() => {
          this.signupForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate(["/"], { replaceUrl: true });
        },
        error => {
          log.debug(`signup error: ${error}`);
          this.error = error;
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.signupForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      remember: true
    });
  }
}
