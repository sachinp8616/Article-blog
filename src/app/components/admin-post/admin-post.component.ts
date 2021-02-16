import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css'],
})
export class AdminPostComponent implements OnInit {
  constructor(private router: Router, private admin: AdminService) {}

  ngOnInit(): void {}

  post: any = {
    title: '',
    desc: '',
    isAproved: true,
    created_by: this.userName.name,
  };

  onSubmit() {
    this.admin.createposts(this.post);
    this.router.navigate(['admin/dashboard']);
  }

  get userName() {
    let username: any = localStorage.getItem('loggedIn');
    return JSON.parse(username);
  }
}
