import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as bcrypt from 'bcryptjs';
import validateSigninInput from 'src/app/validation/validateSigninInput';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  email = '';
  password = '';
  errors: any = {};

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    const user: any = {
      email: this.email,
      password: this.password,
    };

    const { errors, isInvalid } = validateSigninInput(user);

    if (isInvalid) {
      this.errors = errors;
    } else {
      this.errors = {};

      this.auth.login(this.email).subscribe((resp) => {
        if (resp.length > 0) {
          const [user] = resp;
          bcrypt.compare(this.password, user.password).then((isMatch) => {
            if (isMatch) {
              // redirect to dashboard
              localStorage.setItem(
                'loggedIn',
                JSON.stringify({ name: user.name, isAdmin: user.isAdmin })
              );
              // ***************************************************
              if (user.isAdmin) {
                this.router.navigate(['admin/dashboard']);
              } else {
                this.router.navigate(['dashboard']);
              }
              // *******************************************************
            } else {
              this.errors.password = 'Incorrect Password';
            }
          });
        } else {
          this.errors.email = 'Email does not exists';
        }
      });
    }
  }
}
