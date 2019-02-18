import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  errorMsg: string;
  errorMsgReceived = new Subject<string>();
  token: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

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

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/']);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => (this.token = token));
      })
      .catch(error => console.log(error));
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
      console.log(currentUser);
      if (currentUser === null) {
        this.token = null;
      } else {
        currentUser.getIdToken().then((token: string) => (this.token = token));
      }
    });
  }
}