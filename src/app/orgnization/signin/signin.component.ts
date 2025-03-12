import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from '../../org.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signInForm: FormGroup;
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private orgService: OrgService,
    private router: Router
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
            this.signInForm.reset();
            localStorage.setItem(
              'access_token',
              response.data.session.access_token
            );
            console.log('access_token', response.data.session.access_token);
            localStorage.setItem('userId', response.data.user.id);
            console.log('userId' + response.data.user.id);
            this.router.navigate(['/org-dashboard']);
          } else {
            this.signInForm.reset();
            this.showPopup = true;
            this.popupMessage = `Invalid Email or Password.`;
            setTimeout(() => {
              this.showPopup = false;
            }, 2500); // Hide popup after 2 seconds
            return;
          }
        },
        error: (error) => {
          this.signInForm.reset();
          this.showPopup = true;
          this.popupMessage = `Invalid Email or Password.`;
          setTimeout(() => {
            this.showPopup = false;
          }, 2500); // Hide popup after 2 seconds
          return;
        },
      });
    }
  }
}
