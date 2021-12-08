import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../admin/shared/interfaces/product';
import { ProductService } from '../admin/shared/services/product.service';
import { Order } from '../shared/interfaces/order';
import { OrderService } from '../shared/services/order.service';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { ConfirmComponent } from '../shared/_models/confirm/confirm.component';
import { SnackBarTypes } from '../shared/_models/snack-bar-types.enum';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    plyment: new FormControl('cash'),
  })
  public productInCart: Product[] = [];
  public totalPrice: number = 0;
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;

  private confirmRef!: MatDialogRef<ConfirmComponent>;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.productInCart = this.productService.productCart;
    this.totalPrice = this.productInCart.reduce((total, item) => total + +item.price, 0);
  }

  public submit(): void {
    this.confirmRef = this.dialog.open(ConfirmComponent, {
      data: {
        text: "Отправить заказ?",
        buttons: {
          confirm: "Да",
          cancel: "Нет"
        }
      }
    });

    this.confirmRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        if (this.form.invalid) {
          return;
        }

        this.submitted = true;

        const order: Order = {
          name: this.form.value.name,
          phone: this.form.value.phone,
          address: this.form.value.address,
          plyment: this.form.value.plyment,
          price: this.totalPrice,
          orders: this.productInCart,
          date: new Date(),
        }
        this.orderService.addProductToDb(order).subscribe(() => {
          this.form.reset();
          this.submitted = false;
        });
        this._openSnackBar(SnackBarTypes.Success, "Заказ успешно отправлен")
      } else {
        this._openSnackBar(SnackBarTypes.Warning, "Отправка заказа прервана")
      }
    });
    
  }

  public deleteProductInCart(product: Product): void {
    this.totalPrice -= +product.price;
    this.productInCart.splice(this.productInCart.indexOf(product), 1);
  }

  private _openSnackBar(actionType: string, message: string): void {
    message = message;
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }

}
