import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.contactForm = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      message: new FormControl(null, {validators: [Validators.required]}),
      subject: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required]}),
    })


  }

  sendMessage() {
    let saved = false;
   let  name =  this.contactForm.value.name;
   let  email =  this.contactForm.value.email;
   let  message =  this.contactForm.value.message;
   let  subject =  this.contactForm.value.subject;
   let  phone =  this.contactForm.value.phone;
    this.http.post<{status:Boolean, message:string}>(environment.apiUrl+"/sendMessage", {name, email, message, subject,phone}).subscribe(res => {
      this.contactForm.reset(); 
      alert(`mail has been sent. 
                  we will get back to you soon!!!!!`) 
    console.log("saved ");
      saved = true;
    })

    if(saved) {
      this.contactForm.reset();
      console.log("saved 2 ");
    }
  }
 
}
