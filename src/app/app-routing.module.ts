import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { ContentComponent } from './content/content.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  {path:'signup', component: SignupComponent},
  {path:"content/:title", component: ContentComponent},
  {path: 'ed', component: EditorComponent},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  { path: ':topicId', component: EditorComponent, canActivate:  [AuthGuard] },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
