import { Routes, RouterModule } from "@angular/router";
import { EmployeeComponent } from "@app/employee/employee.component";
import { EditEmployeeComponent } from "@app/employee/edit-employee/edit-employee.component";

const routes: Routes = [
  { path: "", component: EmployeeComponent },
  { path: "/:employeeId", component: EditEmployeeComponent }
];

export const EmployeeRoutes = RouterModule.forChild(routes);
