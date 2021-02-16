import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as bcrypt from 'bcryptjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private db: AngularFireDatabase) {}

  login(email: any) {
    return this.db
      .list('/user', (ref) => ref.orderByChild('email').equalTo(email))
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

  register(user: any) {
    bcrypt.genSalt(10, (err: any, salt: any) => {
      bcrypt.hash(user.password, salt, (err: any, hash: any) => {
        user.password = hash;
        this.db.list('user').push(user);
      });
    });
  }
}
