import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";

import { SharedModule } from "@app/shared";
import { MaterialModule } from "@app/material.module";
import { SignupComponent } from "@app/signup/signup.component";
import { SignupRoutingModule } from "@app/signup/signup.routing";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    SignupRoutingModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule {}
