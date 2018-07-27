import { Routes, RouterModule } from "@angular/router";
import { EmployeeComponent } from "@app/employee/employee.component";

const routes: Routes = [{ path: "", component: EmployeeComponent }];

export const EmployeeRoutes = RouterModule.forChild(routes);
