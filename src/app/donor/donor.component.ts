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
  organizations: any[] = [];
  data1: any;
  org: any;
  userId: any;
  donorForm: FormGroup;
  latestDonor = 'TRUE';
  donorData: any;
  showPopup: any;
  popupMessage: any;

  constructor(
    private fb: FormBuilder,
    private receiverFormService: ReceiverService,
    private orgform: OrgService,
    private router: Router,
    private donorService: DonorserveiceService
  ) {
    this.donorForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: ['', Validators.required],
      blood_Quantity: ['', Validators.required],
      blood_group: ['', Validators.required],
      date: ['', Validators.required],
      health_issues: ['', Validators.required],
    });
    this.userId = localStorage.getItem('donorId');
    this.donorData = localStorage.getItem('donorData');
    console.log('donorData', JSON.parse(this.donorData));
  }

  get f() {
    return this.donorForm.controls;
  }

  async onSubmit(latestDonor: any) {
    console.log('button clicked');
    if (this.donorForm.valid) {
      const userFormData = {
        userid: this.userId,
        name: JSON.parse(this.donorData).name,
        phone: JSON.parse(this.donorData).phno,
        location: JSON.parse(this.donorData).address,
        email: JSON.parse(this.donorData).email,
        ...this.donorForm.value,
      };

      console.log(latestDonor);

      this.donorService.falseDonor(this.userId).subscribe({
        next: (response: any) => {
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
        },
        error: (error: any) => {
          console.log('error while setting donor as false');
        },
      });
    }
  }
}
