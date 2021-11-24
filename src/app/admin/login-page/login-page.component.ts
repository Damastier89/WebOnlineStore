import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Admin } from '../../../app/shared/interfaces/admin';
import { AuthService } from '../../../app/admin/shared/service/auth.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { SnackBarTypes } from '../../../app/shared/_models/snack-bar-types.enum';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)]),
  });
  public submitted: boolean = false;
  public matcher = new MyErrorStateMatcher();

  constructor( 
    public auth: AuthService,
    private router: Router,
    // private snackBarService: SnackBarService,
    ) { }

  ngOnInit(): void {}

  public submit(): void {
    if ( this.form.invalid ) {
      return;
    }

    this.submitted = true;

    const admin: Admin = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    }

    this.auth.login(admin).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
    // this._openSnackBar(SnackBarTypes.Success, 'Вы вошли как ');
  }

  // private _openSnackBar(actionType: string, message: string): void {
  //   message = message + '[admin] ';
  //   this.snackBarService.openSnackBar({
  //     actionType,
  //     message,
  //   })
  // }

}
