export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  contact: string;
  createdDate: Date;
}

export class EmployeeModel {
  constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public contact: string,
    public createdDate: Date
  ) {}
}
