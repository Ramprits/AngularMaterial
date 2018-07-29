import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderComponent } from "./order.component";
import { OrderRoutes } from "@app/order/order.routing";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@app/material.module";
import { FormsModule } from "@angular/forms";
import { CreateOrderComponent } from "@app/order/create-order/create-order.component";

@NgModule({
  imports: [CommonModule, OrderRoutes, TranslateModule, FlexLayoutModule, MaterialModule, FormsModule],
  declarations: [OrderComponent, CreateOrderComponent]
})
export class OrderModule {}
