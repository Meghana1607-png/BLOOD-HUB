import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';
import { ReceiverService } from 'src/app/receiver.service';


@Component({
  selector: 'app-receiver-form',
  templateUrl: './receiver-form.component.html',
  styleUrls: ['./receiver-form.component.css']
})
export class ReceiverFormComponent {

  organizations: any[] = [];
  data1:any
  org:any

  patientForm: FormGroup;

  constructor(private fb: FormBuilder,private receiverFormService:ReceiverService,private orgform:OrgService,private router:Router) {
    this.patientForm = this.fb.group({
      date: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      location: ['', [Validators.required]],
      blood_group: ['', [Validators.required]],
      blood_quatity: ['', [Validators.required, Validators.min(1)]], // New field with validation
      emergency: ['', [Validators.required]],
      name:['',[Validators.required]]
    });
  }

  get f() {
    return this.patientForm.controls;
  }

 async onSubmit() {
    if (this.patientForm.valid) {
  
        console.log("Form is valid");
          const { data: sessionData, error: sessionError } = await this.receiverFormService.auth.getSession();
        if (sessionError || !sessionData || !sessionData.session || !sessionData.session.user) {
          console.error("No active session found:", sessionError);
          alert("No active session. Please log in again.");
          return;
        }
        const userId = sessionData.session.user.id;
        console.log("Fetched User ID (authid):", userId);
          const userFormData = {
          userid: userId,
          ...this.patientForm.value
        };  
  
      this.receiverFormService.submitReceiverForm(userFormData).subscribe({
        next: (response) => {
          console.log("User insertion success");
          alert(response.message);
          this.router.navigateByUrl('/org-list');
          this.patientForm.reset();
        },
        error: (error) => {
          console.log('Form submission failed!');
          console.error('Error submitting the form:', error.message);
          alert('An error occurred while submitting the form.');
        },
      });
    }
  }
  


// async orgdetails() : Promise<any>{
//   try{
//   const data2= this.orgform.fetchorgform('id')
//   this.org=data2;
//   console.log("fetch org ",this.org)
//   }
//   catch(error){
//     console.log("failed to fetcch",error)
//   }
  
//     }
  
}

