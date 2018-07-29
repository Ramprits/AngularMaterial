import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Order } from "@app/order/order";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private orders: Order[] = [];
  private orderUpdated = new Subject<Order[]>();
  constructor(private httpClient: HttpClient) {}

  getEmployees() {
    return this.httpClient.get<{ message: string; employees: any }>(`/api/orders`).subscribe(
      employeeData => {
        this.orders = employeeData.employees;
        this.orderUpdated.next([...this.orders]);
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
}
