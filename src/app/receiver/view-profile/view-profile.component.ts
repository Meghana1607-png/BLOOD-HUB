import { Component } from '@angular/core';
import { OrgService } from 'src/app/org.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  pdata: any;
  users:any[]=[]
  profile1 = {
    name: '',
    email: '',
    phno: '',
    address: '',
    // gender:'',
    age:''

  };

  constructor(private profile:ProfileService,private org:OrgService){

    this.fetchUser();
    }
    async fetchUser(): Promise<void> {
      try {
        // Fetch the logged-in user ID
        const { data: sessionData, error: sessionError } = await this.profile.auth.getSession();
        if (sessionError || !sessionData || !sessionData.session?.user) {
          console.error("No active session found:", sessionError);
          alert("No active session. Please log in again.");
          return;
        }
        
        const userId = sessionData.session.user.id;
        console.log("Logged-in User ID:", userId);
    
        // Fetch user details for the logged-in user
        const data = await this.profile.form(userId);
        this.users = data ? [data] : []; // Store as an array for *ngIf to work
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    
    // fetchUsers(): void {
    //   this.loading = true; // Show loader
    //   this.profile.fetch().subscribe({
    //     next: (data) => {
    //       this.users = data;
    //       this.loading = false; // Hide loader
    //     },
    //     error: (err) => {
    //       console.error('Error fetching users:', err);
    //       this.loading = false;
    //     },
    //   });
    func(): void {
      this.org.fetchorgform(1).subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        },
      });
    }
  
  // onSubmit(form: any): void {
  //   if (form.valid) {
  //     console.log('Profile Data:', this.profile);
  //     alert('Profile submitted successfully!');
  //     // Perform additional actions (e.g., API call to save data)
  //   } else {
  //     alert('Please fill in all required fields.');
  //   }
  // }}

}
