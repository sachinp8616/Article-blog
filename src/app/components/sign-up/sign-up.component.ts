import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import isEmpty from 'src/app/validation/is-empty';
import validateRegisterInput from 'src/app/validation/validateRegisterInput';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private user: UserService
  ) {}

  name = '';
  email = '';
  password = '';
  confirmpassword: any = '';
  isAdmin = false;

  errors: any = {};

  profile: any;

  ngOnInit(): void {}

  onSubmit() {
    const user: any = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmpassword: this.confirmpassword,
      isAdmin: false,
    };

    const { errors, isInvalid } = validateRegisterInput(user);

    if (isInvalid) {
      this.errors = errors;
    } else {
      if (isEmpty(this.profile)) {
        this.errors = {};
        delete this.confirmpassword;
        this.auth.register({
          name: this.name,
          email: this.email,
          password: this.password,
          isAdmin: this.isAdmin,
        });
        this.router.navigate(['sign-in']);
      } else {
        this.errors.email = 'Email already exists.';
      }
    }
  }

  onChangeHandler() {
    this.profile = {};
    this.checkExists(this.email);
  }

  checkExists(email: any) {
    this.user.checkExists().subscribe((resp: any) => {
      console.log(resp);
      console.log;
      resp.map((item: any) => {
        if (item.email == email) {
          this.profile = item;
        }
      });
    });
  }
}
