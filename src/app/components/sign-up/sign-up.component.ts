import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  info: any = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  };

  ngOnInit(): void {}

  onSubmit() {
    delete this.info.confirmpassword;
    this.auth.register({
      ...this.info,
      isAdmin: false,
    });
    this.router.navigate(['sign-in']);
  }
}
