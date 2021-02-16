import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  posts$: any = [];

  constructor(private router: Router, private admin: AdminService) {}

  ngOnInit(): void {
    this.posts$ = this.admin.getPosts();
    console.log(this.posts$);
  }

  toggler(id: any, post: any) {
    post.isAproved = !post.isAproved;
    this.admin.updatePost(id, post);
  }

  get userName() {
    let username: any = localStorage.getItem('loggedIn');
    return JSON.parse(username);
  }

  createPost() {
    this.router.navigate(['admin/create-post']);
  }

  onDeletePost(id: any) {
    if (confirm('Do you want to delete this post?')) {
      this.admin.deletePost(id);
    }
  }
}
