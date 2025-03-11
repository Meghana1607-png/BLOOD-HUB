import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonorserveiceService } from 'src/app/donorserveice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {


  bloodForm: FormGroup;
  submitted = false;
  healthIssueIsYes = false;
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];


  constructor(private fb: FormBuilder,private donor:DonorserveiceService) {
    this.bloodForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      healthIssues: ['', Validators.required],
    });
  }

  onHealthChange() {
    const healthIssuesValue = this.bloodForm.get('healthIssues')?.value;
    this.healthIssueIsYes = healthIssuesValue === 'Yes';
  }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.bloodForm.valid && !this.healthIssueIsYes) {
  //     console.log('Form Submitted:', this.bloodForm.value);
  //   }
  // }


// //    handledonorForm =async () => {
// //     console.log ("button clicked");
    
// //  const donorformdata=
// // //  [{
// // //    "name":"yashu",
// // //     "gender":"male",
// // //     "ph_no":"12345678876",
// // //     "email":"yashu @ gmail.com",
// // //      "bloodgroup":"a+",
// // //      "health_issues":"no",
// // //     "address":"seethayyapetfdhgcj",
// // //      "last_donated":"not donated yet"

// // // }]
// // {
// //   name: '',
// //   email: '',
// //   address: '',
// //   last_donated: '',
// //   health_issues: '',
// //   blood_group: '',
// // };

// //     // if(!bloodgroup || !health_issues || !lastdonated){
// //     //     Alert.alert("Error", "All feilds are required !");
// //     //     return;
// //     // }
// //     try{
// //         console.log("sdfghjkhgfd called")
// //         const response = await fetch("http://localhost:3000/donorForminsert",{
// //             method : "POST",
// //             headers: {
// //                 "content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ donorformdata }),
// //         });

            
// //               const data = await response.json();
            
// //                   if (response.ok) {
// //                     alert("Success form submitted!");
// //                   } else {
// //                     alert( data.message);
// //                   }
// //                 } catch (error) {
// //                   console.error("Error:", error);
// //                   alert("Error Failed to submit form . Please try again later.");
// //                 }
// //             };

 donorarray = {
  name: '',
  email: '',
  address: '',
  phno:'',
  last_donated: '',
  health_issues: '',
  blood_group: '',
};

submitForm() {
  this.submitted = true;
  if (this.bloodForm.valid && !this.healthIssueIsYes) {
    console.log('Form Submitted:', this.bloodForm.value);
  }

  console.log('Button clicked!')  
  console.log('Donor data:', this.donor);

  this.donor.Donorinsert(this.donor).subscribe({
    next: (response) => {
      console.log('Donor added successfully', response);
    },
    error: (error) => {
      console.error('Error adding donor:', error);
      if (error.status === 500) {
        console.error('Internal Server Error. Check the backend for details.');
      }
    },
  });
  
}
}
// bloodForm!: FormGroup;
// submitted = false;
// healthIssueIsYes = false;

// constructor(private fb: FormBuilder) {}

// ngOnInit() {
//   this.bloodForm = this.fb.group({
//     name: ['', Validators.required],
//     email: ['', [Validators.required, Validators.email]],
//     phno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//     address: ['', Validators.required],
//     bloodgroup: ['', Validators.required],
//     healthIssues: ['', Validators.required],
//   });
// }

// submitForm() {
//   this.submitted = true;
//   if (this.bloodForm.valid) {
//     console.log('Form submitted:', this.bloodForm.value);
//   }
// }
// }