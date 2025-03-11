import { ApplicationRef, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewOrgFormComponent } from './org-register-form/view-org-form.component'; // Correct import path
import { RequestsComponent } from './requests/requests.component';
import { OrgRequestsComponent } from './org-requests/org-requests.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { OrgProfileComponent } from './org-profile/org-profile.component';
import { PendingReceiversComponent } from './receiverRequests/pending-receivers/pending-receivers.component';
import { ApprovedReceiversComponent } from './receiverRequests/approved-receivers/approved-receivers.component';
import { RejectedReceiversComponent } from './receiverRequests/rejected-receivers/rejected-receivers.component';
import { AllReceiversListComponent } from './receiverRequests/all-receivers-list/all-receivers-list.component';
import { PendingDonorListComponent } from './donorRequests/pending-donor-list/pending-donor-list.component';
import { ApprovedDonorListComponent } from './donorRequests/approved-donor-list/approved-donor-list.component';
import { AllDonorListComponent } from './donorRequests/all-donor-list/all-donor-list.component';
import { RejectedDonorsListComponent } from './donorRequests/rejected-donors-list/rejected-donors-list.component';
import { ViewReceiverComponent } from './view-receiver/view-receiver.component';
import { ViewDonorComponent } from './view-donor/view-donor.component';
import { MessageToRejectComponent } from './message-to-reject/message-to-reject.component';
import { DonorMessageToRejectComponent } from './donor-message-to-reject/donor-message-to-reject.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { IndividualFeedbackComponent } from './individual-feedback/individual-feedback.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  {
    path: 'org-dashboard',
    component: DashboardComponent,
  },
  { path: 'org/view_donor', component: ViewDonorComponent },
  { path: 'org/view_donor_requests', component: ViewDonorComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'view_org', component: ViewOrgFormComponent },
  { path: 'org/view_receiver', component: ViewReceiverComponent },
  { path: 'req', component: RequestsComponent },
  { path: 'org/Profile', component: OrgProfileComponent },
  { path: 'org-request', component: OrgRequestsComponent },
  { path: 'org-form', component: ViewOrgFormComponent },
  { path: 'org/receiversList/pending', component: PendingReceiversComponent },
  { path: 'org/receiversList/approved', component: ApprovedReceiversComponent },
  { path: 'org/receiversList/rejected', component: RejectedReceiversComponent },
  { path: 'org/receiversList', component: AllReceiversListComponent },
  { path: 'org/donorsList/pending', component: PendingDonorListComponent },
  { path: 'org/donorsList/approved', component: ApprovedDonorListComponent },
  { path: 'org/donorsList/rejected', component: RejectedDonorsListComponent },
  { path: 'org/donorsList', component: AllDonorListComponent },
  { path: 'org/receiver/MessageToReject', component: MessageToRejectComponent },
  {
    path: 'org/donor/MessageToRequest',
    component: DonorMessageToRejectComponent,
  },
  {
    path: 'org/donor/MessageToReject',
    component: DonorMessageToRejectComponent,
  },
  { path: 'org/feedbacks', component: FeedbacksComponent },
  {
    path: 'org/feedbacks/individualFeedback',
    component: IndividualFeedbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgnizationRoutingModule {}
