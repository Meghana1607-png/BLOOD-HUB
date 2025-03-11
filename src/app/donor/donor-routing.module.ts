import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AwarenessComponent } from './awareness/awareness.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DonorComponent } from './donor.component';
import { DonorVieworgComponent } from './donor-vieworg/donor-vieworg.component';
import { DonorOrglistComponent } from './donor-orglist/donor-orglist.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
{
  path:'donor-dashboard', 
  component: DashboardComponent
},

{path:'awareness',component:AwarenessComponent},
{path:'donor-vieworg',component:DonorVieworgComponent},
{path:'donorOrg',component:DonorOrglistComponent},
{path:'dsign-up',component:SignUpComponent},
{path:'don',component:DonorComponent},
{path:'dvp',component:ViewProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule { }
