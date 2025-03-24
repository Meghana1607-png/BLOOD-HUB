import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, Subscriber } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { OrgService } from 'src/app/org.service';
import { ProfileService } from 'src/app/profile.service';
import { ReceiverService } from 'src/app/receiver.service';
import { RequestsService } from 'src/app/requests.service';
import { DonorserveiceService } from 'src/app/donorserveice.service';
@Component({
  selector: 'app-donor-view-org',
  templateUrl: './donor-view-org.component.html',
  styleUrls: ['./donor-view-org.component.css'],
})
export class DonorViewOrgComponent {
  orgDetails: any;
  // organization:any[]=[];
  data1: any;
  userid: any = '';
  org_id: any; // Store logged-in user ID
  orgId: string | null = null;
  orgData: any = {};
  selectedOrgId: any;
  userId: any;
  email: any;
  donorData: any;
  pasredDonorData: any;
  donorDetails: any;
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';
  bloodGroupDetails: any;
  constructor(
    private supabase: OrgService,
    private auth: AuthService,
    private receiver: ReceiverService,
    private user: ProfileService,
    private request: RequestsService,
    private router: Router,
    private active: ActivatedRoute,
    private authservice: AuthService,
    private donorService: DonorserveiceService
  ) {
    this.selectedOrgId = this.supabase.fetchorgform('id');
    this.userId = this.user.form('userId');
    this.userId = localStorage.getItem('authId');
    this.userId = localStorage.getItem('donorId');
    this.donorData = localStorage.getItem('donorData');
    this.pasredDonorData = JSON.parse(this.donorData);
    console.log('donoaData', this.pasredDonorData);
    // this.getUserID();
  }

  async ngOnInit() {
    // this.authservice.setAuthId(this.userid);  // Assuming user.id is fetched correctly

    this.active.queryParams.subscribe((params) => {
      this.organization = {
        org_id: params['org_id'] || '',
        name: params['name'] || '',
        email: params['email'] || '',
        phone: params['phone'] || '',
        address: params['address'] || '',
        bloodDetails: params['bloodGroupData'],
      };
    });
    console.log('bloodGroups ', this.organization.bloodDetails);

    this.bloodGroupDetails = JSON.parse(
      JSON.parse(this.organization.bloodDetails)
    );

    console.log('bloodgroupdata', this.bloodGroupDetails);
  }

  organization: {
    org_id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    bloodDetails: any;
  } = {
    org_id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    bloodDetails: [],
  };

  users: any[] = [];
  async getUserID() {
    this.users = await this.user.form(this.userId);
    console.log(this.users);
  }

  getOrgid(): void {
    this.supabase.fetchorgform('id').subscribe({
      next: (data: string) => {
        this.selectedOrgId = data;
        console.log('hii', this.selectedOrgId);
      },
      error: (error: any) => {
        console.error('Error fetching org details:', error);
      },
    });
  }
  async getUserId() {
    const {
      data: { user },
    } = await this.auth.getUser();
    if (user) {
      this.userId = user.id; // Assign the correct user ID
      this.email = user.email; // Assign the correct user email
    } else {
      console.error('User not logged in');
    }
  }

  async requestBlood() {
    console.log('gjasjh', this.userId);
    this.donorService.fetchDonorDetails(this.userId).subscribe({
      next: (data: any) => {
        this.donorDetails = data;
        console.log('donorDetails', this.donorDetails);
      },
      error: (err: any) => {
        console.error('Error fetching donor', err);
      },
    });

    const requestData = {
      org_id: this.organization.org_id,
      userid: this.donorDetails[0].donor_id,
      email: this.pasredDonorData.email,
      status: 'pending',
      created_at: new Date().toISOString(), // Ensure created field is properly set
    };

    console.log('Request Data before submitting:', requestData); // Debugging

    this.donorService.submitRequest(requestData).subscribe({
      next: (data: any) => {
        this.showPopup = true;
        this.popupMessage = `Request sent successfully!`;
        setTimeout(() => {
          this.showPopup = false;
        }, 2500);
        alert('request sent succesfully!');
        this.router.navigate(['/donor/dashboard']);
        return;
      },
      error: (err: any) => {
        this.router.navigate(['/donor/dashboard']);
        console.error('Error sending request:', err);
        console.log('Failed to send request. Please try again.');
      },
    });
  }
}
