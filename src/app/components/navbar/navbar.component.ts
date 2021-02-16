import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private user: UserService,
    private admin: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get userLoggedIn() {
    const isLoggedIn = !!localStorage.getItem('loggedIn');
    return isLoggedIn;
  }

  get adminLoggedIn() {
    return !!this.admin.loggedIn();
  }

  get userInfo() {
    let userName: any = localStorage.getItem('loggedIn');
    return JSON.parse(userName);
  }

  onSignOut() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['sign-in']);
  }
}
