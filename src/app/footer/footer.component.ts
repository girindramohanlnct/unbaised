import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  email:string;

  constructor(private authService: AuthService,private http: HttpClient) { }

  ngOnInit(): void {
  }
  subscribe() {
    let email = document.getElementById("email");

    if(this.email && this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
     
      this.http.post(environment.apiUrl+"/subscribe", {email:email}).subscribe(res=> {
        alert("Email subscribed successfully "+ email);
      })
      
      
      
      
    }
  }

}
