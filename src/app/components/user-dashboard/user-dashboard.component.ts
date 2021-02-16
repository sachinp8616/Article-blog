import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  posts: any = [];
  subscription!: Subscription;

  constructor(private router: Router, private user: UserService) {}

  ngOnInit(): void {
    this.subscription = this.user.getPosts().subscribe((resp) => {
      // this.posts = resp;
      // console.log(this.posts);
      resp.map((item) => {
        if (item.created_by == this.userName.name) {
          this.posts.push(item);
        }
      });
    });
  }

  onSignOut() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['sign-in']);
  }

  onDeletePost(id: any) {
    if (confirm('Do you want delete this post?')) {
      this.user.deletePost(id);
    }
  }

  onEdit(id: any) {
    this.router.navigate(['user-post/' + id]);
  }

  get userName() {
    let username: any = localStorage.getItem('loggedIn');
    return JSON.parse(username);
  }

  createPost() {
    this.router.navigate(['create-post']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
