import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // ErrorMsg: string;
  errorMessage: string;
  successMessage: string;

  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  // onSignUp(form: NgForm) {
  //   this.ErrorMsg = '';
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   console.log(email);
  //   console.log(password);

  //   this.authService.signupUser(email, password);
  //   // setTimeout(()=>{
  //   //   console.log(this.authService.errorMsg)
  //   // },2000);

  //   this.subscription = this.authService.errorMsgReceived.subscribe((error: string) => {
  //     this.ErrorMsg = error;
  //   });
  // }

  onSignUp(form: NgForm) {
    this.authService.doRegister(form.value).then(
      res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
