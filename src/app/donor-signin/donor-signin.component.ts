import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DonorserveiceService } from '../donorserveice.service';



@Component({
  selector: 'app-donor-signin',
  templateUrl: './donor-signin.component.html',
  styleUrls: ['./donor-signin.component.css']
})
export class DonorSigninComponent {


// signinForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router ,private auth:AuthService,private donor:DonorserveiceService) {
//     this.signinForm = this.fb.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   OnSubmit() {
//     if (this.signinForm.valid) {
//       console.log('Form Submitted', this.signinForm.value);
//       // Perform login logic here
//       this.router.navigate(['/donor-dashboard'])
//     }

//     this.donor.profilefetch(authId).subscribe({
//       next: (res: any) => {
//         console.log("API Response:", res);

//         if (!res?.data || res.data.length === 0) {
//           console.error("Error: No user data received");
//           alert("Profile fetch error: No user data found.");
//           return;
//         }

//         const userProfile = res.data[0];
//         console.log("User Profile:", userProfile); 

//         if (!userProfile.name || !userProfile.email || !userProfile.phno || !userProfile.address) {
//           console.log("User profile incomplete, redirecting to profile setup.");
//           // this.router.navigateByUrl('/donor-dashboard');
//         } else {
//           console.log("User profile complete, redirecting to dashboard.");
//           this.router.navigateByUrl('/donor-dashboard');
//         }
        
//       },
//       error: (err) => {
//         console.error("Profile Fetch Error:", err);
//         alert("Profile fetch error");
//       }
//     });
//   }
// },
// error: (err) => {
//   console.error("Sign-in Error:", err);
//   alert("Sign-in failed. Please check your credentials.");
// }
// });
// }


//   navigateToSignup() {
//     this.router.navigate(['/dsign-up']);
//   }
// }

}

