import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AwarenessComponent } from './awareness/awareness.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DonorComponent } from './donor.component';
import { DonorViewOrgComponent } from './donor-view-org/donor-view-org.component';
import { DonorOrglistComponent } from './donor-orglist/donor-orglist.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { DonorSigninComponent } from '../donor-signin/donor-signin.component';
import { OrgListComponent } from './org-list/org-list.component';
import { OrgProfileComponent } from '../orgnization/org-profile/org-profile.component';

const routes: Routes = [
  {
    path: 'donor-dashboard',
    component: DashboardComponent,
  },
  { path: 'donor/signIn', component: DonorSigninComponent },
  { path: 'awareness', component: AwarenessComponent },
  { path: 'donorOrg', component: DonorOrglistComponent },
  { path: 'donor/signUp', component: SignUpComponent },
  { path: 'donor/request/form', component: DonorComponent },
  { path: 'dvp', component: ViewProfileComponent },
  { path: 'donor/dashboard', component: DashboardComponent },
  { path: 'donor/org-list', component: OrgListComponent },
  { path: 'donor/viewOrg', component: DonorViewOrgComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorRoutingModule {}
