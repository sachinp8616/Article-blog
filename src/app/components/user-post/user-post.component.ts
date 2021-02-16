import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css'],
})
export class UserPostComponent implements OnInit {
  id: any;

  constructor(
    private router: Router,
    private user: UserService,
    private route: ActivatedRoute
  ) {
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.user.getpost(this.id).subscribe((resp) => (this.post = resp));
    }
  }

  ngOnInit(): void {}

  post: any = {
    title: '',
    desc: '',
    isAproved: false,
    created_by: this.userName.name,
  };

  onSubmit() {
    if (this.id) {
      this.user.updatePost(this.id, this.post);
    } else {
      this.user.createsPost(this.post);
    }
    this.router.navigate(['dashboard']);
  }

  get userName() {
    let username: any = localStorage.getItem('loggedIn');
    return JSON.parse(username);
  }
}
