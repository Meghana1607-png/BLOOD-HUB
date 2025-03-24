import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrgService } from 'src/app/org.service';
import { ReceiverService } from 'src/app/receiver.service';
@Component({
  selector: 'app-donor-form-request',
  templateUrl: './donor-form-request.component.html',
  styleUrls: ['./donor-form-request.component.css'],
})
export class DonorFormRequestComponent {
  donor: any;
  userId: any;
  org: any;
  donorForm: any;
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private receiverFormService: ReceiverService,
    private orgform: OrgService,
    private router: Router,
    private activeroute: ActivatedRoute
  ) {
    this.donorForm = this.fb.group({
      blood_Quantity: ['', Validators.required],
      blood_group: ['', Validators.required],
    });
    this.userId = localStorage.getItem('userId');
    this.org = localStorage.getItem('organization');
  }

  async ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      console.log("params['dataToSend']", JSON.parse(params['dataToSend']));
      this.donor = {
        id: params['userid'],
        email: params['email'],
        dataToSend: params['dataToSend'],
        name: params['donorName'],
        donorBloodGroup: params['donorBloodGroup'],
      };
      console.log('gkjjgfjg,', this.donor);
    });
  }

  onSubmit() {
    console.log('this.donorForm.value', this.donorForm.value);
    if (this.donorForm.valid) {
      if (this.donorForm.value.blood_group == this.donor.donorBloodGroup) {
        this.router.navigate(['/org/donor/MessageToRequest'], {
          queryParams: {
            userid: this.donor.id,
            email: this.donor.email,
            dataToSend: this.donor.dataToSend,
            donorName: this.donor.name,
            bloodGroup: this.donorForm.value.blood_group,
            bloodQuantity: this.donorForm.value.blood_Quantity,
          },
        });
      } else {
        this.showPopup = true;
        this.popupMessage = `Blood group and requesting blood group is not matching`;
        setTimeout(() => {
          this.showPopup = false;
        }, 2500);
      }
    }
  }
}
