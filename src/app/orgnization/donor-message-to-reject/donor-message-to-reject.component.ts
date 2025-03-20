import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-donor-message-to-reject',
  templateUrl: './donor-message-to-reject.component.html',
  styleUrls: ['./donor-message-to-reject.component.css'],
})
export class DonorMessageToRejectComponent {
  userId: any;
  message: string = '';
  currentPath: any;
  presentPath: any;
  messageToRequest: any;
  requestDonorData: any;
  organisation: any;
  org: any;
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';

  constructor(
    private orgService: OrgService,
    private router: Router,
    private active: ActivatedRoute
  ) {
    this.presentPath = this.router.url;
    console.log('presentPath', this.presentPath);
    this.currentPath = this.presentPath.split('?')[0].trim();
    console.log('currentPath', this.currentPath);
    this.userId = localStorage.getItem('userId');
    console.log('hvdshjshs', this.userId);
    this.org = localStorage.getItem('organisation');
    if (this.org) {
      this.organisation = JSON.parse(this.org);
    }
    console.log(
      'organisation details in sending message module',
      this.organisation
    );
  }

  ngOnInit() {}

  donor: {
    id: any;
    email: any;
    dataToSend: any;
    name: any;
    blood_group: any;
    blood_quantity: any;
  } = {
    id: '',
    email: '',
    dataToSend: {},
    name: '',
    blood_group: '',
    blood_quantity: '',
  };

  rejectdonor: {
    id: any;
    email: any;
    name: any;
  } = {
    id: '',
    email: '',
    name: '',
  };

  requestDonor(userId: any, message: string, donorEmail: string): void {
    this.active.queryParams.subscribe((params) => {
      console.log("params['dataToSend']", JSON.parse(params['dataToSend']));
      this.donor = {
        id: params['userid'],
        email: params['email'],
        dataToSend: JSON.parse(params['dataToSend']),
        name: params['donorName'],
        blood_group: params['bloodGroup'],
        blood_quantity: params['bloodQuantity'],
      };
      console.log('gkjjgfjg,', this.donor);
    });
    console.log('dataToSend in donor message ', this.donor.dataToSend);
    this.orgService
      .requestDonor(
        this.userId,
        message,
        this.donor.email,
        this.donor.dataToSend,
        this.organisation,
        this.donor.name,
        this.donor.blood_group,
        this.donor.blood_quantity
      )
      .subscribe({
        next: (data: any) => {
          this.requestDonorData = data;
          this.router.navigate(['/org-dashboard']);
          console.log('requestDonorData:', this.requestDonorData);
          this.showPopup = true;
          this.popupMessage = `request sent successfully!`;
          setTimeout(() => {
            this.showPopup = false;
          }, 2500);
          return;
        },
        error: (err: any) => {
          console.error('error in requesting the donor', err);
        },
      });
  }

  rejectDonor(message: string, donorEmail: string): void {
    this.active.queryParams.subscribe((params) => {
      this.rejectdonor = {
        id: params['userid'],
        email: params['email'],
        name: params['donorName'],
      };
      console.log('gkj,', this.donor);
    });
    this.orgService
      .rejectDonor(
        this.rejectdonor.id,
        message,
        this.rejectdonor.email,
        this.organisation,
        this.rejectdonor.name
      )
      .subscribe({
        next: (data: any) => {
          console.log('rejectDonorData:', data);
          this.router.navigate(['/org-dashboard']);
        },
        error: (err: any) => {
          console.error('error in rejecting the donor', err);
        },
      });
  }
}
