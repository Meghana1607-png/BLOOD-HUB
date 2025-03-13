import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from '././../org.service';
import { Router } from '@angular/router';
import { DonorserveiceService } from 'src/app/donorserveice.service';

@Component({
  selector: 'app-donor-signin',
  templateUrl: './donor-signin.component.html',
  styleUrls: ['./donor-signin.component.css'],
})
export class DonorSigninComponent {
  signInForm: FormGroup;
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private orgService: OrgService,
    private router: Router,
    private donorService: DonorserveiceService
  ) {
    // Inject OrgService and Router
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.orgService.OrgSignIn(this.signInForm.value).subscribe({
        next: (response) => {
          console.log('response', response);
          if (response.data) {
            this.donorService.userFetch(response.data.user.id).subscribe({
              next: (response1: any) => {
                console.log('response', response1[0]);
                if (response1.length > 0) {
                  localStorage.setItem(
                    'donorData',
                    JSON.stringify(response1[0])
                  );
                  this.signInForm.reset();
                  localStorage.setItem(
                    'accesstoken',
                    response.data.session.access_token
                  );
                  console.log(
                    'accesstoken',
                    response.data.session.access_token
                  );
                  localStorage.setItem('donorId', response.data.user.id);
                  console.log('userId' + response.data.user.id);
                  this.router.navigate(['/donor/dashboard']);
                } else {
                  this.signInForm.reset();
                  this.showPopup = true;
                  this.popupMessage = `This is not a donor email. It is organisation official email. Sign in with another email`;
                  setTimeout(() => {
                    this.showPopup = false;
                  }, 2500);
                  return;
                }
              },
              error: (error: any) => {
                this.signInForm.reset();
                this.showPopup = true;
                this.popupMessage = `Invalid Email or Password.`;
                setTimeout(() => {
                  this.showPopup = false;
                }, 2500);
                return;
              },
            });
          } else {
            this.signInForm.reset();
            this.showPopup = true;
            this.popupMessage = `Invalid Email or Password.`;
            setTimeout(() => {
              this.showPopup = false;
            }, 2500);
            return;
          }
        },
        error: (error: any) => {
          this.signInForm.reset();
          this.showPopup = true;
          this.popupMessage = `Invalid Email or Password.`;
          setTimeout(() => {
            this.showPopup = false;
          }, 2500);
          return;
        },
      });
    }
  }
}
