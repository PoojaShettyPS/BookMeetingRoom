import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public userid = '';
  public password = '';

  constructor(public formBuilder: FormBuilder, public router: Router) {
    this.loginForm = this.formBuilder.group({
      userid: [this.userid, [Validators.required]],
      password: [this.password, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onLogin() {
    this.router.navigate(['/master']);
  }

}
