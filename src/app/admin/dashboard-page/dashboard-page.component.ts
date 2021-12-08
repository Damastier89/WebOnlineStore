import { SnackBarTypes } from './../../shared/_models/snack-bar-types.enum';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { Product } from './../shared/interfaces/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/_models/confirm/confirm.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public searchProductName: any = '';

  private confirmRef!: MatDialogRef<ConfirmComponent>;
  private destroyNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private productService: ProductService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.productService.getAllProduct().pipe(takeUntil(this.destroyNotifier))
    .subscribe((product: Product[]) => {
      this.products = product; 
    })
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next(true);
    this.destroyNotifier.complete();
  }

  public deleteProduct(id: string): void {
    this.confirmRef = this.dialog.open(ConfirmComponent, {
      data: {
        text: "Вы уверены что ходите удалить данный продукт?",
        buttons: {
          confirm: "Да",
          cancel: "Нет"
        }
      }
    })

    this.confirmRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.deleteProduct(id).pipe(takeUntil(this.destroyNotifier))
        .subscribe(() => {
          this.products = this.products.filter(product => product.id !== id);
          this._openSnackBar(SnackBarTypes.Warning, 'Продукт был удален');
        });
      } else {
        this._openSnackBar(SnackBarTypes.Success, 'Удаление товара прервано');
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
