import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeComponent } from "./employee.component";
import { EditEmployeeComponent } from "@app/employee/edit-employee/edit-employee.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@app/material.module";
import { EmployeeRoutes } from "@app/employee/employee.routing";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "always" }),
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    EmployeeRoutes
  ],
  declarations: [EmployeeComponent, EditEmployeeComponent]
})
export class EmployeeModule {}
