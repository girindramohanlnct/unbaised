import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeTab = "home";
  isHam = false;
  isShow = false;

  private authListnerSubs: Subscription;
    userIsAuthenticated = false;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService.getAuthStatusListener().subscribe( (isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  hamClick() {
    console.log('huss');
    this.isShow = !this.isShow
    this.isHam = !this.isHam;
  }

  getActiveTab(tab) {
    this.isShow = !this.isShow
   this.activeTab = tab;

 }

 ngOnDestroy() {
  this.authListnerSubs.unsubscribe();
}
onLogout() {
  this.authService.logout();
}

}
