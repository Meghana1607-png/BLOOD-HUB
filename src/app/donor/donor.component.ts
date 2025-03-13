import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';
import { ReceiverService } from 'src/app/receiver.service';
import { DonorserveiceService } from '../donorserveice.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css'],
})
export class DonorComponent {
  // user:any=null;
  //   donorForm: FormGroup;
  //   bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  //   constructor(private fb: FormBuilder,private donor:DonorserveiceService) {
  //     this.donorForm = this.fb.group({
  //       Name: ['', Validators.required],
  //       Age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
  //       BloodGroup: ['', Validators.required],
  //       HealthIssues: ['',Validators.required],
  //       LastDonatedDate: ['',Validators.required],
  //       Mobile_Number: ['',Validators.required],
  //       Gender: ['',Validators.required],
  //       location: ['',Validators.required],
  //       email: ['',Validators.required],
  //     });
  //     this.user= localStorage.getItem('authId')

  // }
  // get f() {
  //   return this.donorForm.controls;
  // }

  //  async onSubmit() {
  //   console.log("button clicked")
  //   try {
  //     // Retrieve user ID from local storage
  //     const userId = localStorage.getItem('authId'); // 👈 Get stored auth ID

  //     if (!userId) {
  //       console.error("No authId found in localStorage.");
  //       alert("No user ID found. Please log in again.");
  //       return;
  //     }

  //     console.log("Retrieved User ID:", userId);

  //   //   // Fetch user details from the donors table
  //   //   this.user = await this.donor.profilefetch(userId); // Ensure `profilefetch` queries donors table

  //   //   if (!this.user) {
  //   //     console.error("User not found in donors table.");
  //   //     alert("No donor profile found.");
  //   //   } else {
  //   //     console.log("Fetched User:", this.user);
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error fetching user:", error);
  //   // }
  //   if (this.donorForm) {
  //     console.log("Form Values:", this.donorForm.value);
  //     console.log("Form Valid:", this.donorForm.valid);

  //     if (this.donorForm.valid) {
  //       console.log("Donor Form Submitted", this.donorForm.value)
  //       this.donor.Donorinsert(this.donorForm.value).subscribe({
  //         next: (res: any) => {
  //           console.log("success:", res)
  //           alert(res.message);
  //           this.donorForm.reset();
  //         },
  //         error: (error: any) => {
  //           console.error('Error submitting form:', error);
  //           alert('An error occurred while submitting the form. Please try again later.');
  //         }
  //       });
  //     } else {
  //       alert("Please fill all required fields!");
  //     }
  //     }
  // }
  // catch (error) {
  //      console.error("Error fetching user:", error);
  //    }
  //  }

  organizations: any[] = [];
  data1: any;
  org: any;
  userId: any;
  donorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private receiverFormService: ReceiverService,
    private orgform: OrgService,
    private router: Router,
    private donorService: DonorserveiceService
  ) {
    this.userId = this.donorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: ['', Validators.required],
      blood_Quantity: ['', Validators.required],
      blood_group: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      date: ['', Validators.required],
      health_issues: ['', Validators.required],
      location: ['', Validators.required],
    });
    this.userId = localStorage.getItem('donorId');
  }

  get f() {
    return this.donorForm.controls;
  }

  async onSubmit() {
    if (this.donorForm.valid) {
      const userFormData = {
        userid: this.userId,
        ...this.donorForm.value,
      };

      this.donorService.submitDonorForm(userFormData).subscribe({
        next: (response: any) => {
          console.log('User insertion success');
          console.log(response.message);
          this.router.navigateByUrl('/donor/org-list');
          this.donorForm.reset();
        },
        error: (error: any) => {
          console.log('Form submission failed!');
          console.error('Error submitting the form:', error.message);
          console.log('An error occurred while submitting the form.');
        },
      });
    }
  }
}
