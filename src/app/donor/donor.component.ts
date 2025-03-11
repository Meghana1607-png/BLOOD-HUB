import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonorserveiceService } from '../donorserveice.service';


@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent {
user:any=null;
  donorForm: FormGroup;
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  constructor(private fb: FormBuilder,private donor:DonorserveiceService) {
    this.donorForm = this.fb.group({
      Name: ['', Validators.required],
      Age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      BloodGroup: ['', Validators.required],
      HealthIssues: ['',Validators.required],
      LastDonatedDate: ['',Validators.required],
      Mobile_Number: ['',Validators.required],
      Gender: ['',Validators.required],
      location: ['',Validators.required],
      email: ['',Validators.required],
    });
    this.user= localStorage.getItem('authId')

}
get f() {
  return this.donorForm.controls;
}

 async onSubmit() {
  console.log("button clicked")
  try {
    // Retrieve user ID from local storage
    const userId = localStorage.getItem('authId'); // 👈 Get stored auth ID

    if (!userId) {
      console.error("No authId found in localStorage.");
      alert("No user ID found. Please log in again.");
      return;
    }

    console.log("Retrieved User ID:", userId);

  //   // Fetch user details from the donors table
  //   this.user = await this.donor.profilefetch(userId); // Ensure `profilefetch` queries donors table

  //   if (!this.user) {
  //     console.error("User not found in donors table.");
  //     alert("No donor profile found.");
  //   } else {
  //     console.log("Fetched User:", this.user);
  //   }
  // } catch (error) {
  //   console.error("Error fetching user:", error);
  // }
  if (this.donorForm) {
    console.log("Form Values:", this.donorForm.value);
    console.log("Form Valid:", this.donorForm.valid);

    if (this.donorForm.valid) {
      console.log("Donor Form Submitted", this.donorForm.value)
      this.donor.Donorinsert(this.donorForm.value).subscribe({
        next: (res: any) => {
          console.log("success:", res)
          alert(res.message);
          this.donorForm.reset();
        },
        error: (error: any) => {
          console.error('Error submitting form:', error);
          alert('An error occurred while submitting the form. Please try again later.');
        }
      });
    } else {
      alert("Please fill all required fields!");
    }
    }
}
catch (error) {
     console.error("Error fetching user:", error);
   }
 }
}