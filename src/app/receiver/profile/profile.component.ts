import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ProfileService } from 'src/app/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  receiverForm: FormGroup;
  userId:any;
  profileData: any;

  constructor(private fb: FormBuilder, private profile: ProfileService, private router: Router, private supabase:AuthService ) {
    this.receiverForm = this.fb.group({
      // gender: ['', Validators.required],
      phno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      // age: ['', Validators.required],
      name: ['', Validators.required],

    });
   this.userId= localStorage.getItem('authId')
  }


  async ngOnInit(){
    this.fetchUserProfile()
  }
  fetchUserProfile() {
    this.supabase.auth.getSession().then((result:any) => {
      if (!result || !result.data || !result.data.session || !result.data.session.user) {
        console.error("No active session found:", result?.error);
        return;
      } 
      const userId = result.data.session.user.id;
      this.profile.profilefetch(userId).subscribe({
        next: (res: any) => {
          if (!res || !res.data || res.data.length === 0) {
            console.warn("No profile data found.");
            return;
          }
          this.profileData = res.data[0]; 
          console.log("Fetched Profile Data:", this.profileData);
        },
        error: (err) => {
          console.error("Error fetching profile data:", err);
        }
      });
    }).catch((error:any) => {
      console.error("Error retrieving session:", error);
    });
  }
  
  async submitForm() {
    if (this.receiverForm.valid) {
      console.log("Form is valid");
        const { data: sessionData, error: sessionError } = await this.supabase.auth.getSession();
      if (sessionError || !sessionData || !sessionData.session || !sessionData.session.user) {
        console.error("No active session found:", sessionError);
        alert("No active session. Please log in again.");
        return;
      }
      const userId = sessionData.session.user.id;
      console.log("Fetched User ID (authid):", userId);
        const userFormData = {
        userid: userId,
        ...this.receiverForm.value
      };  
      console.log("Sending data:", userFormData);
        this.profile.profileinsert(userFormData).subscribe({
        next: (response) => {
          console.log("API Response:", response);
          alert(response.message);
          this.receiverForm.reset();
        },
        error: (error) => {
          console.error("Error:", error);
          alert("An error occurred.");        }      });
    } else {
      alert("Please fill out all required fields.");
    }
  }
   
  
  }
  
