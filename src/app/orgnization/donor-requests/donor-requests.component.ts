import { Component } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donor-requests',
  templateUrl: './donor-requests.component.html',
  styleUrls: ['./donor-requests.component.css'],
})
export class DonorRequestsComponent {
  donorRequestsList: any;
  userId: any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchDonorRequestList(this.userId);
  }

  fetchDonorRequestList(userId: string): void {
    this.orgService.fetchDonorRequestLists(userId).subscribe({
      next: (data: any) => {
        this.donorRequestsList = data;
        console.log('donorRequestsList:', this.donorRequestsList);
      },
      error: (err: any) => {
        console.error('Error fetching approved donors:', err);
      },
    });
  }
}
