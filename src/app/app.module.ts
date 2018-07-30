import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { Angulartics2Module } from "angulartics2";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";

import { environment } from "@env/environment";
import { CoreModule } from "@app/core";
import { SharedModule } from "@app/shared";
import { HomeModule } from "./home/home.module";
import { LoginModule } from "./login/login.module";
import { SignupModule } from "@app/signup/signup.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptor } from "@app/core/authentication/auth.interceptor";

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register("./ngsw-worker.js", { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "always" }),
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    HomeModule,
    LoginModule,
    SignupModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
