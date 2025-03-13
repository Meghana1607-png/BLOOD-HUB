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
  styleUrls: ['./view-org-form.component.css']
})
export class ViewOrgFormComponent {

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
bloodGroupDetails: any;

  constructor(private supabase:OrgService,private auth:AuthService,private receiver:ReceiverService, private user:ProfileService,private request:RequestsService, private router:Router, private active:ActivatedRoute,private authservice:AuthService){

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
        bloodDetails: params['bloodGroupData']
 }
    });
    this.bloodGroupDetails = JSON.parse(this.organization.bloodDetails)
    console.log("bloodgroupdata", this.organization.bloodDetails)
  }
   
  organization : {
    org_id: string,
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
        console.log("hii",this.selectedOrgId);
      },
      error: (error: any) => {
        console.error('Error fetching org details:', error);
      }
    });
  }
  async getUserId() {
    const { data: { user } } = await this.auth.getUser();
    if (user) {
      this.userId = user.id; // Assign the correct user ID
      this.email = user.email; // Assign the correct user email
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
      created_at: new Date().toISOString() // Ensure created field is properly set
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
  


