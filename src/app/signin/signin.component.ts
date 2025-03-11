import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
FormBuilder;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private service: ProfileService
  ) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // OnSubmit() {
  //   if (this.signinForm.valid) {
  //     console.log('Form Submitted', this.signinForm.value);

  //     const { email, password } = this.signinForm.value;
  //     this.auth.signIn(email, password).subscribe({
  //       next: (res: any) => {
  //         if (res.error) {
  //           alert('user login failed');
  //         } else {
  //           console.log(res);
  //           const authId = res.data.user.id;
  //           localStorage.setItem('authId', authId);
  //           console.log('Auth ID stored:', authId);
  //           this.service.profilefetch(localStorage.getItem('authId')).subscribe({
  //             next: (res: any) => {
  //               console.log(" API Response:", res); 
  //               if (!res || !res.data || res.data.length === 0) {
  //                 console.error(" Error: No user data received");
  //                 alert("Profile fetch error: No user data found.");
  //                 return;              }

  //               const userProfile = res.data[0];

  //               console.log(" User Profile:", userProfile);

  //               if (userProfile.gender == null) {
  //                 this.router.navigateByUrl('/rprofile');
  //               } else {
  //                 this.router.navigateByUrl('/rec-dashboard');
  //               }
  //             },
  //             error: (err) => {
  //               console.error("API Fetch Error:", err);
  //               alert("Profile fetch error");
  //             }         });

  //         }       }     });   } }
  OnSubmit() {
    if (this.signinForm.valid) {
      console.log('Form Submitted', this.signinForm.value);
  
      const { email, password } = this.signinForm.value;
      
      this.auth.signIn(email, password).subscribe({
        next: (res: any) => {
          if (res.error) {
            alert('User login failed');
          } else {
            console.log('Login Response:', res);
  
            const authId = res.data?.user?.id;
            if (!authId) {
              console.error("Auth ID not found");
              alert("Authentication failed. Please try again.");
              return;
            }
  
            localStorage.setItem('authId', authId);
            console.log('Auth ID stored:', authId);
  
            // Fetch user profile
            this.service.profilefetch(authId).subscribe({
              next: (res: any) => {
                console.log("API Response:", res);
  
                if (!res?.data || res.data.length === 0) {
                  console.error("Error: No user data received");
                  alert("Profile fetch error: No user data found.");
                  return;
                }
  
                const userProfile = res.data[0];
                console.log("User Profile:", userProfile); 
  
                if (!userProfile.name || !userProfile.email || !userProfile.phno || !userProfile.address) {
                  console.log("User profile incomplete, redirecting to profile setup.");
                  this.router.navigateByUrl('/rprofile');
                } else {
                  console.log("User profile complete, redirecting to dashboard.");
                  this.router.navigateByUrl('/rec-dashboard');
                }
                
              },
              error: (err) => {
                console.error("Profile Fetch Error:", err);
                alert("Profile fetch error");
              }
            });
          }
        },
        error: (err) => {
          console.error("Sign-in Error:", err);
          alert("Sign-in failed. Please check your credentials.");
        }
      });
    }
  }
  

  navigateToSignup() {
    this.router.navigate(['/Sign-up']);
  }
}
