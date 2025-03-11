import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwarenessComponent } from './awareness/awareness.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DonorVieworgComponent } from './donor-vieworg/donor-vieworg.component';
import { DonorOrglistComponent } from './donor-orglist/donor-orglist.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';


@NgModule({
  declarations: [
    DonorComponent,
    DashboardComponent,
    ProfileComponent,
    AwarenessComponent,
    SignUpComponent,
    DonorVieworgComponent,
    DonorOrglistComponent,
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    DonorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DonorModule { }
