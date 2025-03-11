import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiverComponent } from './receiver.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceiverRoutingModule } from './receiver-routing.module';
import { ReceiverFormComponent } from './receiver-form/receiver-form.component';
import { RecAwarenessComponent } from './rec-awareness/rec-awareness.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { RecRequestsComponent } from './rec-requests/rec-requests.component';
import { VeiwRecFormComponent } from './veiw-rec-form/veiw-rec-form.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    ReceiverComponent,
    ProfileComponent,
    DashboardComponent,
    ReceiverFormComponent,
    RecAwarenessComponent,
    ViewProfileComponent,
    RecRequestsComponent,
    VeiwRecFormComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReceiverRoutingModule
  ]
})
export class ReceiverModule { }
