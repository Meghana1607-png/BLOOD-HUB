import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ReceiverService } from 'src/app/receiver.service';

@Component({
  selector: 'app-rec-form-table',
  templateUrl: './rec-form-table.component.html',
  styleUrls: ['./rec-form-table.component.css']
})
export class RecFormTableComponent {
  recipientForms: any[] = []; 
  recipients: any[] = []; // Stores recipient form data
 UserId: string | null = null;

  constructor(private supabseService: ReceiverService) {
    this.UserId=localStorage.getItem('authId')
    console.log(this.UserId)
  }

  // Fetch recipient forms from Supabase service
  fetchRecipients() {

  
      if (!this.UserId) {
        console.error('User ID is missing or invalid!');
        return;
      }
    
      this.supabseService.getRecipientForms(this.UserId).subscribe({
        next: (data) => {
          console.log()
          console.log('Fetched recipients:', data.data);
          console.log("length:",data.data.length);
          if (data.data && Array.isArray(data.data)) {
            this.recipients = data.data;
            console.log(this.recipients)
          } else {
            this.recipients = []; // Ensure it's an empty array if no data
          }
        },
        error: (err) => {
          console.error('Error fetching recipients:', err);
          this.recipients = []; // Handle error case
        }
      });
    }

  // Handle "View Details" button click
  viewDetails(receiver: any) {
    console.log('Viewing details for:', receiver);
    // Navigate to details page or open a modal
  }

  // Call fetch function when component initializes
  ngOnInit() {
    this.fetchRecipients();
  }
}