import { Component, OnInit, OnDestroy } from "@angular/core";
import { Employee, EmployeeModel } from "@app/employee/employee.model";
import { EmployeeService } from "@app/employee/employee.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"]
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees: EmployeeModel[] = [];
  private employeeSub: Subscription;
  employee: EmployeeModel;
  isEdit = false;
  employeeId: string;
  mode = "create";
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("employeeId")) {
        this.employeeId = paramMap.get("employeeId");
        this.employee = this.employeeService.getEmployee(this.employeeId);
        this.employeeService.updateEmployee(this.employeeId, this.employee);
      } else {
        this.mode = "create";
        this.employeeId = null;
      }
    });
    setTimeout(() => {
      this.employeeService.getEmployees();
      this.employeeSub = this.employeeService.getEmployeeUpdateListener().subscribe((employees: Employee[]) => {
        this.employees = employees;
      });
    }, 0);
  }
  saveEmployee(employeeData: EmployeeModel) {
    this.employeeService.addEmployee(employeeData);
    this.isEdit = false;
  }
  onDelete(employeeData: Employee) {}
  AddPost() {
    this.isEdit = true;
  }
  cancel() {
    this.isEdit = false;
  }

  onEdit(id: string) {
    this.employeeService.updateEmployee(id, this.employee);
    this.router.navigate(["/employee", id]);
  }
  ngOnDestroy() {
    this.employeeSub.unsubscribe();
  }
}
