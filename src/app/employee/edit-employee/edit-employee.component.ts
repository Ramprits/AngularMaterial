import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Employee } from "@app/employee/employee.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { StringIterator } from "lodash";
import { EmployeeService } from "@app/employee/employee.service";

@Component({
  selector: "app-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.scss"]
})
export class EditEmployeeComponent implements OnInit {
  @Output() addEmployee = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  employeeForm: FormGroup;
  private mode = "create";
  private employeeId: string;
  private employee: Employee;
  constructor(private router: ActivatedRoute, private employeeService: EmployeeService) {}

  ngOnInit() {
   

    this.employeeForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      contact: new FormControl("", [Validators.required]),
      createdDate: new FormControl(new Date())
    });
  }
  onEmployeeSave(employeeData: Employee) {
    if (this.employeeForm.invalid) {
      return;
    }
    if (this.mode == "create") {
      this.addEmployee.emit(employeeData);
    } else {
      
    }
  }

  resertForm() {
    this.employeeForm.reset();
    this.cancelEdit.emit();
  }
}
