import { Title } from "@angular/platform-browser";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MatSidenav } from "@angular/material";

import { AuthenticationService } from "../../authentication/authentication.service";
import { I18nService } from "../../i18n.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidenav: MatSidenav;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.authListenerSubs = this.authenticationService.getAuthStatusListner().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout();
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  // get username(): string {
  //   const credentials = this.authenticationService.credentials;
  //   return credentials ? credentials.username : null;
  // }

  get title(): string {
    return this.titleService.getTitle();
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
