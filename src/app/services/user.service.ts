import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  createsPost(post: any) {
    return this.db.list('posts/').push({
      ...post,
      // created_at: Date.now()
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

  deletePost(id: any) {
    return this.db.list('posts').remove(id);
  }

  getpost(id: any) {
    return this.db.object('posts/' + id).valueChanges();
  }

  updatePost(id: any, post: any) {
    return this.db.object('posts/' + id).update(post);
  }

  userLoggedIn() {
    const userInfo: any = localStorage.getItem('loggedIn');
    const user = JSON.parse(userInfo);
    if (user.isAdmin) {
      return false;
    } else {
      return true;
    }
  }

  checkExists() {
    return this.db
      .list('user')
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
}
