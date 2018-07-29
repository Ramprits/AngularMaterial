import { Component, OnInit, ViewChild } from "@angular/core";
import { Order } from "@app/order/order";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-create-order",
  templateUrl: "./create-order.component.html",
  styleUrls: ["./create-order.component.scss"]
})
export class CreateOrderComponent implements OnInit {
  @ViewChild("orderForm") orderForm = NgForm;
  constructor() {}

  ngOnInit() {}

  onSave() {
    console.log(this.orderForm);
  }
}
