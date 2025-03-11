import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverComponent } from './receiver.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceiverFormComponent } from './receiver-form/receiver-form.component';
import { RecAwarenessComponent } from './rec-awareness/rec-awareness.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { RecRequestsComponent } from './rec-requests/rec-requests.component';
import { VeiwRecFormComponent } from './veiw-rec-form/veiw-rec-form.component';

const routes: Routes = [{ path: '', component: ReceiverComponent },
{
  path: 'rprofile',
  component: ProfileComponent
},
{
  path: 'rec-dashboard',
  component: DashboardComponent
},
{
  path: 'rec-form',

  component: ReceiverFormComponent
},
{path:'vp',component:ViewProfileComponent},
{ path: 'rec-awareness', component: RecAwarenessComponent },
{path:'rec-req',component:RecRequestsComponent},
{path:'view-rec',component:VeiwRecFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiverRoutingModule { }
