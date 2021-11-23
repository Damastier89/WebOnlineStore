import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Product } from '../../shared/interfaces/product';

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

  constructor() { }

  ngOnInit(): void {}

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    const product: Product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
    }

    console.log(this.form);
    

  }

}
