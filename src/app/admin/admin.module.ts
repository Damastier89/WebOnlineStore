import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from '@angular/material/button';

import { LoginPageComponent } from "./login-page/login-page.component";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout.component";
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditProductPageComponent } from './edit-product-page/edit-product-page.component';
import { OrderProductPageComponent } from './order-product-page/order-product-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'add-product', component: AddProductPageComponent},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent},
          {path: 'product/:id/edit', component: EditProductPageComponent},
          {path: 'order', component: OrderProductPageComponent},
        ]
      }
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddProductPageComponent,
    DashboardPageComponent,
    EditProductPageComponent,
    OrderProductPageComponent
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})

export class AdminModule {

}