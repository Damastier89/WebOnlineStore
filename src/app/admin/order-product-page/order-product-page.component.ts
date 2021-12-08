import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order';
import { OrderService } from 'src/app/shared/services/order.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/_models/confirm/confirm.component';
import { SnackBarTypes } from 'src/app/shared/_models/snack-bar-types.enum';

@Component({
  selector: 'app-order-product-page',
  templateUrl: './order-product-page.component.html',
  styleUrls: ['./order-product-page.component.scss']
})
export class OrderProductPageComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];

  private destroyNotifier: Subject<boolean> = new Subject<boolean>();
  private confirmRef!: MatDialogRef<ConfirmComponent>;

  constructor(
    private orderService: OrderService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().pipe(takeUntil(this.destroyNotifier))
    .subscribe((orders: Order[]) => {
      this.orders = orders;
    })
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  public deleteOrder(id: string): void {
    this.confirmRef = this.dialog.open(ConfirmComponent, {
      data: {
        text: "Вы уверены что ходите удалить данный заказ?",
        buttons: {
          confirm: "Да",
          cancel: "Нет"
        }
      }
    });

    this.confirmRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.orderService.deleteOrder(id).pipe(takeUntil(this.destroyNotifier))
        .subscribe(() => {
          this.orders = this.orders.filter(product => product.id !== id);
          this._openSnackBar(SnackBarTypes.Success, 'Заказ был удален');
        });
      } else {
        this._openSnackBar(SnackBarTypes.Warning, 'Удаление заказы прервано');
      }
    })
  }

  private _openSnackBar(actionType: string, message: string): void {
    message = message;
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }

}
