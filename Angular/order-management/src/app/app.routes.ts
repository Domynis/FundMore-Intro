import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDeleteComponent } from './order-delete/order-delete.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderExistsGuardService } from './order-exists-guard.service';

export const routes: Routes = [
    {path: '', redirectTo: 'orders', pathMatch: 'full'},
    {path: 'orders', title: 'Orders', component: OrdersComponent,
        children: [
            {path: '', component: OrderListComponent},
            {path: 'add', component: OrderAddComponent},
            {path: 'update/:id', component: OrderUpdateComponent, canActivate: [OrderExistsGuardService]},
            {path: 'delete/:id', component: OrderDeleteComponent, canActivate: [OrderExistsGuardService]}
        ]
    },
];