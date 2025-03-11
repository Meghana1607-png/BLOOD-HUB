import { Component } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pending-donor-list',
  templateUrl: './pending-donor-list.component.html',
  styleUrls: ['./pending-donor-list.component.css'],
})
export class PendingDonorListComponent {
  pendingDonor: any;
  userId: any;

  constructor(
    private orgService: OrgService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchPendingDonor(this.userId);
  }

  fetchPendingDonor(userId: string): void {
    this.orgService.fetchPendingDonors(userId).subscribe({
      next: (data: any) => {
        this.pendingDonor = data;
        console.log('pendingDonors:', this.pendingDonor);
      },
      error: (err: any) => {
        console.error('Error fetching pending donors:', err);
      },
    });
  }

  viewDetails(donor: any): void {
    console.log('donor details in veiwDetails', donor);
    this.router.navigate(['org/view_donor'], {
      queryParams: {
        id: donor.userid,
        status: donor.status,
        email: donor.email,
        org_id: donor.org_id,
      },
    });
  }
}
