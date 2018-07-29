import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject } from "rxjs";
import { Employee, EmployeeModel } from "@app/employee/employee.model";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  employees: EmployeeModel[] = [];
  private employeeUpdated = new Subject<EmployeeModel[]>();

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<{ message: string; employees: EmployeeModel[] }>(`/api/employees`).subscribe(
      employeeData => {
        this.employees = employeeData.employees;
        this.employeeUpdated.next([...this.employees]);
        console.log(employeeData.message);
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 404) {
            console.error("Post doesn't found with status code : ", error.status);
          }
        }
      },
      () => {
        console.log("Finally loadded post");
      }
    );
  }

  getEmployee(id: string) {
    return { ...this.employees.find(p => p._id == id) };
  }
  addEmployee(employeeData: EmployeeModel) {
    this.http.post<{ message: string; employee: EmployeeModel }>("/api/employees", employeeData).subscribe(res => {
      this.employees.push(employeeData);
      this.employeeUpdated.next([...this.employees]);
      console.log(res.message);
    });
  }

  updateEmployee(id: string, employeeData: EmployeeModel) {
    this.http.put<{ message: string; employee: EmployeeModel }>("/api/employees/" + id, employeeData).subscribe(res => {
      this.employees.push(res.employee);
      this.employeeUpdated.next([...this.employees]);
      console.log(res.message);
    });
  }

  getEmployeeUpdateListener() {
    return this.employeeUpdated.asObservable();
  }
}
