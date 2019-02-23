import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../user/user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  errorMsg: string;
  errorMsgReceived = new Subject<string>();
  token: string;
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  userRef: AngularFireList<User> = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.afAuth.authState
      .pipe(
        switchMap(auth => {
          if (auth) {
            /// signed in
            return this.db.object('users/' + auth.uid).valueChanges();
          } else {
            /// not signed in
            return of(null);
          }
        })
      )
      .subscribe(user => {
        this.user.next(user);
      });
  }

  doRegister(value: any) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
            this.router.navigate(['/']);
            firebase
              .auth()
              .currentUser.getIdToken()
              .then((token: string) => (this.token = token));
            this.updateUser(res.user);
          },
          err => reject(err)
        );
    });
  }

  doLogin(value: any) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
            this.router.navigate(['/']);
            firebase
              .auth()
              .currentUser.getIdToken()
              .then((token: string) => (this.token = token));
          },
          err => reject(err)
        )
        .catch(error => console.log(error));
    });
  }

  /// updates database with user info after login

  updateUser(authData: any) {
    const userData = new User(authData);
    const ref = this.db.object('users/' + authData.uid);
    ref.valueChanges().subscribe(user => {
      if (!user) {
        ref.update(userData);
      }
    });
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => (this.token = token));

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  loadUser() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser === null) {
        this.token = null;
      } else {
        currentUser.getIdToken().then((token: string) => (this.token = token));
      }
    });
  }
}
