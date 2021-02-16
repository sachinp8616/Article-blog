import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminPostComponent } from './components/admin-post/admin-post.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { UserService } from './services/user.service';
import { UserGuard } from './gaurds/user.guard';
import { AdminService } from './services/admin.service';
import { AdminGuard } from './gaurds/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { GuestGuard } from './gaurds/guest.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    NavbarComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    AdminPostComponent,
    UserPostComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    UserService,
    UserGuard,
    AdminService,
    AdminGuard,
    AuthService,
    GuestGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
