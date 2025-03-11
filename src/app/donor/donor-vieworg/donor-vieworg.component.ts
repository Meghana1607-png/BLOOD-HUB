import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { OrgService } from 'src/app/org.service';
import { ProfileService } from 'src/app/profile.service';
import { ReceiverService } from 'src/app/receiver.service';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-donor-vieworg',
  templateUrl: './donor-vieworg.component.html',
  styleUrls: ['./donor-vieworg.component.css']
})
export class DonorVieworgComponent {

  orgDetails:any
  // organization:any[]=[];
  data1:any
  userid: any = '';   
  org_id:any    // Store logged-in user ID
  orgId: string | null = null;
  orgData: any = {};
  selectedOrgId: any;
  userId: any;
email:any
constructor(private supabase:OrgService,private auth:AuthService,private receiver:ReceiverService, private user:ProfileService,private request:RequestsService, private router:Router, private active:ActivatedRoute){

    this.selectedOrgId = this.supabase.fetchorgform('id');
    this.userId = this.user.form('userId'); 
    this.userId = localStorage.getItem('authId');
    this.userId = localStorage.getItem('userId');
    this.getUserID();
  }
  async ngOnInit() {
    // this.authservice.setAuthId(this.userid);  // Assuming user.id is fetched correctly

   
    this.active.queryParams.subscribe((params) => {
      this.organization = {org_id: params['org_id'] || '',
        name: params['name'] || '',
        email: params['email'] || '',
        phone: params['phone'] || '',
        address: params['address'] || '',
        bloodDetails: params['bloodDetails'] ? JSON.parse(params['bloodDetails']) : [],
 };
    });
  }
   
  organization : {
    org_id: string,
    name: string;
    email: string;
    phone: string;
    address: string;
    bloodDetails: any[];
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
        console.log(this.selectedOrgId);
      },
      error: (error: any) => {
        console.error('Error fetching org details:', error);
      }
    });
  }
  async getUserId() {
    const { data: { user } } = await this.auth.getUser();
    if (user) {
      this.userId = user.id; 
      this.email = user.email;
    } else {
      console.error('User not logged in');
    }
  }
  
  async requestBlood() {
    const requestData = {
      org_id: this.orgId, 
      userid: this.userId, 
      email: this.email,
      status: 'Pending',
      created_at: new Date().toISOString() 
    };
  
    console.log('Request Data before submitting:', requestData); // Debugging
  
    this.request.submitRequest(requestData).subscribe({
      next: (data) => {
        alert('Request sent successfully!');
      },
      error: (err) => {
        console.error('Error sending request:', err);
        alert('Failed to send request. Please try again.');
      }
    });
  }
   
}
