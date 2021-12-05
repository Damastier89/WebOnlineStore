import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ConfirmComponent } from 'src/app/shared/_models/confirm/confirm.component';
import { SnackBarTypes } from 'src/app/shared/_models/snack-bar-types.enum';
import { Product } from '../shared/interfaces/product';
import { ProductService } from '../shared/services/product.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.scss']
})
export class EditProductPageComponent implements OnInit {
  public form!: FormGroup;
  public product!: Product;
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;

  private confirmRef!: MatDialogRef<ConfirmComponent>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.productService.getProductById(params['id']);
      })
    ).subscribe(products => {
      this.product = products;
      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      });;
    });
  }

  public submit(): void {
    this.confirmRef = this.dialog.open(ConfirmComponent, {
      data: {
        text: "Закончить обновление продукта?",
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
      this.productService.updateProduct({
        ...this.product,
        type: this.form.value.type,
        title: this.form.value.title,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date(),
      }).subscribe(() => {
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']);
      });

      this._openSnackBar(SnackBarTypes.Success, "Товар успешно обнавлен")
      } else {
        this._openSnackBar(SnackBarTypes.Warning, "Обнавление товара прервано")
      }
    });
    
  }

  private _openSnackBar(actionType: string, message: string): void {
    message = message;
    this.snackBarService.openSnackBar({
      actionType,
      message,
    })
  }

}
