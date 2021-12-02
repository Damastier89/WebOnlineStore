import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarTypes } from 'src/app/shared/_models/snack-bar-types.enum';
import { SnackBarService } from '../../../app/shared/services/snack-bar.service';
import { ConfirmComponent } from '../../../app/shared/_models/confirm/confirm.component';
import { Product } from '../shared/interfaces/product';
import { ProductService } from '../shared/services/product.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent implements OnInit {
  public form = new FormGroup({
    type: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    photo: new FormControl(null, Validators.required),
    info: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
  });
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;

  private confirmRef!: MatDialogRef<ConfirmComponent>;

  constructor( 
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private productService: ProductService,
    private router: Router,
    ) { }

  ngOnInit(): void {}

  public submit(): void {
    this.confirmRef = this.dialog.open(ConfirmComponent, {
      data: {
        text: "Закончить добавление продукта?",
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
        const product: Product = {
          type: this.form.value.type,
          title: this.form.value.title,
          photo: this.form.value.photo,
          info: this.form.value.info,
          price: this.form.value.price,
          date: new Date(),
        }
      this.submitted = true;
      this.productService.create(product).subscribe(() => {
        this.form.reset();
        this.submitted = false;
        // this.router.navigate(['/']);
      });

      this._openSnackBar(SnackBarTypes.Success, "Товар успешно добавлен")
      } else {
        this._openSnackBar(SnackBarTypes.Warning, "Добавление товара прервано")
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
