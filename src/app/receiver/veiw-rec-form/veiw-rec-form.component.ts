import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiverService } from 'src/app/receiver.service';

@Component({
  selector: 'app-veiw-rec-form',
  templateUrl: './veiw-rec-form.component.html',
  styleUrls: ['./veiw-rec-form.component.css']
})
export class VeiwRecFormComponent {

  receiver: any = null;
  // isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
   private receiverService :ReceiverService,
    private route: ActivatedRoute,
    private router:Router
    ,private cdr:ChangeDetectorRef
  ) {}


  
  ngOnInit() {
    const userid = localStorage.getItem('authId'); 
    console.log('Fetching receiver details for:', userid);
  
    this.receiverService.recfetch(userid).subscribe({
      next: (response) => {
        if (response && response.data && response.data.length > 0) {
          this.receiver = response.data[0];  
          console.log('Receiver object assigned:', this.receiver); // Debugging
        } else {
          console.warn('No receiver form found, redirecting...');
          this.router.navigate(['/rec-form']);
        }
      },
      error: () => this.router.navigate(['/rec-form']), 
    });
  }
  
  
}
