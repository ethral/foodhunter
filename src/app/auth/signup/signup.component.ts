import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  ErrorMsg: string;

  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSignUp(form: NgForm) {
    this.ErrorMsg = '';
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signupUser(email, password);
    // setTimeout(()=>{
    //   console.log(this.authService.errorMsg)
    // },2000);

    this.subscription = this.authService.errorMsgReceived.subscribe((error: string) => {
      this.ErrorMsg = error;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
