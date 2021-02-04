import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

import { map } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userNameField: new FormControl('', [Validators.required]),
      passwordField: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const {
      controls: {
        userNameField: { value: userNameField },
        passwordField: { value: passwordField }
      }
    } = this.loginForm;

    this.auth.authenticate(userNameField, passwordField).subscribe(({token}) => {
      localStorage.setItem('token', token);

      this.router.navigate(['dashboard']);
    }, (error) => {
      console.log(error);

      if (error && error.error && error.error.message) {
        this.snackBar.open(error.error.message, 'Close');
      }
    });
  }

}
