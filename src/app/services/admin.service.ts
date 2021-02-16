import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private db: AngularFireDatabase) {}

  loggedIn() {
    const userInfo: any = localStorage.getItem('loggedIn');
    const user = JSON.parse(userInfo);
    if (user.isAdmin) {
      return true;
    } else {
      return false;
    }
  }

  createposts(post: any) {
    return this.db.list('posts').push({
      ...post,
      created_at: formatDate(
        Date.now(),
        'dd-MM-yyyy hh:mm:ss a',
        'en-US',
        '+0530'
      ),
    });
  }

  getPosts() {
    return this.db
      .list('posts')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((item) => ({
            key: item.key,
            ...item.payload.exportVal(),
          }))
        )
      );
  }

  updatePost(id: any, post: any) {
    return this.db.object('posts/' + id).update(post);
  }

  deletePost(id: any) {
    return this.db.list('posts/').remove(id);
  }
}
