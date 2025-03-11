import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-donor-orglist',
  templateUrl: './donor-orglist.component.html',
  styleUrls: ['./donor-orglist.component.css']
})
export class DonorOrglistComponent {

data:any
  constructor(private supabase:OrgService, private router:Router){

    this.fetchorg();
  }
  organizations :any[]= []
    fetchorg() {
    this.supabase.fetchorgform(1).subscribe({
      next: (response) => {
        if (response.error) {
          console.error('Error fetching organizations:', response.error);
        } else if (response.data) {
          console.log(response.data)
          this.organizations = response.data;
          console.log('Organizations fetched successfully:', this.organizations);
        } else {
          console.warn('No data received');
        }
      },
      error: (error) => {
        console.error('Failed to fetch organizations:', error);
      },
    });
  }
  
  ngOnInit(){}

  viewDetails(org: any): void {
this.router.navigate(['/donor-vieworg'], {queryParams:{id:org.id, email:org.email, phone:org.phone,name:org.name,address:org.address, gender:org.gender, age:org.age}})
  }
}

