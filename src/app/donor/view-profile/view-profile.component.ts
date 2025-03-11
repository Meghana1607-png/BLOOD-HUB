import { Component } from '@angular/core';
import { DonorserveiceService } from 'src/app/donorserveice.service';
import { OrgService } from 'src/app/org.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
pdata: any;
users1:any[]=[]
daya:any[]=[]
  users:any[]=[]
  profile1 = {
    Name: '',
    email: '',
    Mobile_Number: '',
    location: '',
    Gender:'',
    Age:''

  };

  constructor(private profile:DonorserveiceService,private org:OrgService){
    this.fetchUser();
 }
 async fetchUser(): Promise<void> {
  try {
    const { data: sessionData, error: sessionError } = await this.profile.auth.getSession();
    if (sessionError || !sessionData || !sessionData.session?.user) {
      console.error("No active session found:", sessionError);
      alert("No active session. Please log in again.");
      return;
    }       
    const userId = sessionData.session.user.id;
    console.log("Logged-in User ID:", userId);

    // Fetch user details
    const data = await this.profile.profilefetch(userId);
    if (data) {
      this.users =this.users?.[0]; // Store as an array
    } else {
      this.users = []; // Ensure it's an empty array, not undefined
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}
}