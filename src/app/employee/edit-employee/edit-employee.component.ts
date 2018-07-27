import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.scss"]
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor() {}

  ngOnInit() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      contact: new FormControl("", [Validators.required])
    });
  }
  onEmployeeSave(employeeData: any) {
    console.log(this.employeeForm);
  }
}
