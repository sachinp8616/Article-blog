import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any = [];
  constructor(private admin: AdminService) {
    this.admin.getPosts().subscribe((changes) =>
      changes.map((item) => {
        if (item.isAproved) {
          this.posts.push(item);
        }
      })
    );
  }

  ngOnInit(): void {}
}
