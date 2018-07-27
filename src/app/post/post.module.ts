import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./post.component";
import { PostRoutingModule } from "@app/post/post.routing";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MaterialModule } from "@app/material.module";
import { EditPostComponent } from "@app/post/edit-post/edit-post.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "always" }),
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    PostRoutingModule
  ],
  declarations: [PostComponent, EditPostComponent]
})
export class PostModule {}
