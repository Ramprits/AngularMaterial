import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { extract } from "@app/core";
import { SignupComponent } from "@app/signup/signup.component";

const routes: Routes = [{ path: "signup", component: SignupComponent, data: { title: extract("signup") } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SignupRoutingModule {}
