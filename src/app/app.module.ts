import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DonorModule } from './donor/donor.module';
import { OrgnizationModule } from './orgnization/orgnization.module';
import { ReceiverModule } from './receiver/receiver.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrgListComponent } from './org-list/org-list.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DonorSigninComponent } from './donor-signin/donor-signin.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    OrgListComponent,
    SignupComponent,
    SigninComponent,
    DonorSigninComponent,
    SearchComponentComponent,
    HeaderBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DonorModule,
    OrgnizationModule,
    ReceiverModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
