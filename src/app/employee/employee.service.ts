import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject } from "rxjs";
import { Employee } from "@app/employee/employee.model";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private employees: Employee[] = [];
  private employeeUpdated = new Subject<Employee[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<{ message: string; employees: Employee[] }>(`/api/posts`).subscribe(
      postData => {
        this.employees = postData.employees;
        this.employeeUpdated.next([...this.employees]);
        console.log(postData.message);
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 404) {
            console.error("Post doesn't found with status code : ", error.status);
          }
        }
      },
      () => {
        console.log('Finally loadded post');
      }
    );
  }
  getEmployeeUpdateListener() {
    return this.employeeUpdated.asObservable();
  }
}
