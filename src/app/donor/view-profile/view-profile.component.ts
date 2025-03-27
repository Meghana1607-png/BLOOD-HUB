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
    name: '',
    email: '',
    phno: '',
    address: '',
    // Gender:'',
    // Age:''

  };
  isEditing: boolean = false;
  editableUser: any = {};



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

    const data = await this.profile.profilefetch(userId);
    console.log("Fetched User Profile:", data); // Debugging

    if (!data) {
      console.warn(`No donor profile found for user: ${userId}`);
      this.users = [];
      return;
    }

    this.users = [data]; 
    console.log("Fetched Users Array:", this.users);

  } catch (error) {
    console.error("Error fetching user:", error);
  }
}



  editProfile(user: any): void {
    this.isEditing = true;
    this.editableUser = { ...user };
  }
  async saveChanges(): Promise<void> {
    try {
      console.log("Editable User Before Saving:", this.editableUser); 
      if (!this.editableUser || !this.editableUser.userid) {
        console.error("User ID is missing!", this.editableUser);
        alert("User ID is missing. Please refresh and try again.");
        return;
      }
  
      console.log("Updating user with ID:", this.editableUser.userid);
  
      const updatedUser = await this.profile.updateUser(this.editableUser.userid, this.editableUser);
      this.users = [updatedUser]; 
      this.isEditing = false;
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }
  
}