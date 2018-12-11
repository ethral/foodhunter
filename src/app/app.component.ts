import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'foodhunter';

  ngOnInit(){

    firebase.initializeApp({
      apiKey: "AIzaSyBpXl6stJ9gxU5PZFXPVOw_owheclajFbc",
      authDomain: "foodhunter-db.firebaseapp.com"
    });

  }
}
