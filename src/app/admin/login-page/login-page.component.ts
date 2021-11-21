import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/shared/interfaces/customer';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public submitted: boolean = false;

  constructor( 
    public auth: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)]),
    })
  }

  public submit(): void {
    if ( this.form.invalid ) {
      return;
    }

    this.submitted = true;

    const costumer: Customer = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    }

    this.auth.login(costumer).subscribe((res) => {
      console.log(res);
      
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
  }

}
