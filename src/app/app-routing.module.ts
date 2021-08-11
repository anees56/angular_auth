import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'home', component: HomeComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },// default load when load app
  // { path: 'header', component: HeaderComponent },
  // { path: 'footer', component: FooterComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'about', component: AboutComponent },
  {
    path: '', redirectTo: '/login', pathMatch: 'full' //to show /login in url
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    canActivate: [AuthGuard], //for protecting unaouthorized access to this path
    component: HomeComponent,
    children: [
      
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full',
      },
      
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      
    ],
  },
  { path: '**', redirectTo :'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
