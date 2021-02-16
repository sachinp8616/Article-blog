import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminPostComponent } from './components/admin-post/admin-post.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { AdminGuard } from './gaurds/admin.guard';
import { GuestGuard } from './gaurds/guest.guard';
import { UserGuard } from './gaurds/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [GuestGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [GuestGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [GuestGuard] },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'create-post',
    component: UserPostComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'user-post/:id',
    component: UserPostComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/create-post',
    component: AdminPostComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/post/:id',
    component: AdminPostComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
