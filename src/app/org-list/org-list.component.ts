import { Component } from '@angular/core';
import { OrgService } from '../org.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent {

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
  console.log("org",org)
this.router.navigate(['/view_org'], {queryParams:{id:org.id, email:org.email, phone:org.phone,name:org.name,address:org.address, gender:org.gender, age:org.age, bloodGroupData: org.blood_groups
}})
  }
}
