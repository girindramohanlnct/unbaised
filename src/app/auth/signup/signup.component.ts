import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub = new Subscription();

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStaus => {
      this.isLoading = false;
    });
  }

  onSignup(form: NgForm) {
    
    if (form.invalid) {
      return;
    }
    if(form.value.password !== form.value.cpassword) {
      return;
    }
    console.log("Registering............")
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.mobile, form.value.name);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}