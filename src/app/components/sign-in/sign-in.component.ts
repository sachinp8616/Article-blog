import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  email = '';
  password = '';

  passwordError: any;
  emailError: any;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.auth.login(this.email).subscribe((resp) => {
      if (resp.length > 0) {
        const [user] = resp;
        bcrypt.compare(this.password, user.password).then((isMatch) => {
          console.log(isMatch);

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
            // this.passwordError = 'Incorrect Password';
            this.passwordError = true;
          }
        });
      } else {
        // this.emailError = 'Email does not exists';
        this.emailError = true;
      }
    });
  }
  get passError() {
    return this.passwordError;
  }
  get emailErr() {
    return this.emailError;
  }
}
