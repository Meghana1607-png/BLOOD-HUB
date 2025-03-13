import { Component } from '@angular/core';
import { OrgService } from 'src/app/org.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  users: any[] = [];
  isEditing: boolean = false;
  editableUser: any = {};

  constructor(private profile: ProfileService, private org: OrgService) {}

  ngOnInit(): void {
    this.fetchUser();
  }
  async fetchUser(): Promise<void> {
    try {
      const { data: sessionData, error: sessionError } = await this.profile.auth.getSession();
      if (sessionError || !sessionData?.session?.user) {
        console.error("No active session found:", sessionError);
        alert("No active session. Please log in again.");
        return;
      }
  
      const userId = sessionData.session.user.id;
      console.log("Logged-in User ID:", userId);
  
      const data = await this.profile.form(userId);
      if (data) {
        this.users = [data];
        this.editableUser = { ...data, userid: userId }; // ✅ Fix: Ensure userid is stored
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  

  editProfile(user: any): void {
    this.isEditing = true;
    this.editableUser = { ...user }; // Clone user data to avoid modifying original directly
  }
  async saveChanges(): Promise<void> {
    try {
      if (!this.editableUser || !this.editableUser.userid) {
        console.error('User ID is missing!');
        alert('User ID is missing. Please refresh and try again.');
        return;
      }
  
      console.log('Updating user with ID:', this.editableUser.userid);
  
      const updatedUser = await this.profile.updateUser(this.editableUser.userid, this.editableUser);
      this.users = [updatedUser]; // Update UI with new data
      this.isEditing = false;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
  
}