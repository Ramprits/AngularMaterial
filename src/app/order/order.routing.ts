import { Routes, RouterModule } from "@angular/router";
import { OrderComponent } from "@app/order/order.component";
import { CreateOrderComponent } from "@app/order/create-order/create-order.component";

const routes: Routes = [{ path: "", component: OrderComponent }, { path: "create", component: CreateOrderComponent }];

export const OrderRoutes = RouterModule.forChild(routes);
