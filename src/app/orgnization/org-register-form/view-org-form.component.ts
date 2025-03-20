import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, Subscriber } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { OrgService } from 'src/app/org.service';
import { ProfileService } from 'src/app/profile.service';
import { ReceiverService } from 'src/app/receiver.service';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-view-org-form',
  templateUrl: './view-org-form.component.html',
  styleUrls: ['./view-org-form.component.css'],
})
export class ViewOrgFormComponent {
  orgDetails: any;
  data1: any;
  userid: any = '';
  org_id: any; // Store logged-in user ID
  orgId: string | null = null;
  orgData: any = {};
  selectedOrgId: any;
  userId: any;
  email: any;
  bloodGroupDetails: any;
  receiverDetails: any;
  user_id: any;
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';

  constructor(
    private supabase: OrgService,
    private auth: AuthService,
    private receiver: ReceiverService,
    private user: ProfileService,
    private request: RequestsService,
    private router: Router,
    private active: ActivatedRoute,
    private authservice: AuthService
  ) {
    this.selectedOrgId = this.supabase.fetchorgform('id');
    this.userId = this.user.form('userId');
    this.userId = localStorage.getItem('authId');
    this.user_id = localStorage.getItem('authId');
    this.getUserID();
  }

  async ngOnInit() {
    // this.authservice.setAuthId(this.userid);  // Assuming user.id is fetched correctly

    this.active.queryParams.subscribe((params) => {
      this.organization = {
        org_id: params['id'] || '',
        name: params['name'] || '',
        email: params['email'] || '',
        phone: params['phone'] || '',
        address: params['address'] || '',
        bloodDetails: params['bloodGroupData'],
      };
    });
    this.bloodGroupDetails = JSON.parse(this.organization.bloodDetails);
    console.log('bloodgroupdata', this.organization.org_id);

    console.log('kjkh', this.user_id);
    this.request.fetchReceiverDetails(this.user_id).subscribe({
      next: (data: any) => {
        this.receiverDetails = data;
        console.log('receiverDetails', this.receiverDetails);
      },
      error: (err: any) => {
        console.error('Error fetching receiver', err);
      },
    });
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

  users: any;
  async getUserID() {
    this.users = await this.user.form(this.userId);
    console.log('dkmnfkj', this.users);
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
    console.log(user.email);
    if (user) {
      this.userId = user.id; // Assign the correct user ID
      this.email = user.email; // Assign the correct user email
    } else {
      console.error('User not logged in');
    }
  }

  async requestBlood() {
    console.log('email,', this.email);
    const requestData = {
      org_id: this.organization.org_id,
      userid: this.receiverDetails[0].recid,
      email: this.users.email,
      status: 'pending',
      created_at: new Date().toISOString(), // Ensure created field is properly set
    };

    console.log('Request Data before submitting:', requestData); // Debugging

    this.request.submitRequest(requestData).subscribe({
      next: (data) => {
       
        this.showPopup = true;
          this.popupMessage = `request sent successfully!`;
          setTimeout(() => {
            this.showPopup = false;
          }, 2500);
          this.router.navigate(['/rec-dashboard']);
           return;
      },
      error: (err) => {
        console.error('Error sending request:', err);
        console.log('Failed to send request. Please try again.');
      },
    });
  }
}
