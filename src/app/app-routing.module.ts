import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OrgListComponent } from './org-list/org-list.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DonorSigninComponent } from './donor-signin/donor-signin.component';

const routes: Routes = [
  {path: 'donor1', loadChildren: () => import('./donor/donor.module').then(m => m.DonorModule) }, 
  {path: 'org', loadChildren: () => import('./orgnization/orgnization.module').then(m => m.OrgnizationModule) },
  {path:'receiver',loadChildren:() => import('./receiver/receiver.module').then(m => m.ReceiverModule)},
  {path:'app',component:AppComponent },
  {path:'',component:LandingPageComponent},
  {path:'org-list',component:OrgListComponent},
  {path:'Sign-up',component:SignupComponent},
  {path:'Sign-In',component:SigninComponent},
  {path:'donor-SignIn',component:DonorSigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
