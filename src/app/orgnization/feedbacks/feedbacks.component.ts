import { Component } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css'],
  providers: [DatePipe],
})
export class FeedbacksComponent {
  org: any;
  organisation: any;
  feedbacksData: any;

  constructor(
    private orgService: OrgService,
    private router: Router,
    private active: ActivatedRoute
  ) {
    this.org = localStorage.getItem('organisation');
    if (this.org) {
      this.organisation = JSON.parse(this.org);
    }
    console.log(
      'organisation details in sending message module',
      this.organisation
    );
  }

  ngOnInit(): void {
    this.fetchFeedbacks(this.organisation);
  }

  navigateToFeedbackDetails(feedbacksData: any) {
    this.router.navigate(['org/feedbacks/individualFeedback'],{
      queryParams: {
        id: feedbacksData.userId,
        org_id:this.organisation.userId
      },
    });
  }

  fetchFeedbacks(organisation: any) {
    this.orgService.fetchFeedbacks(organisation.userId).subscribe({
      next: (data: any) => {
        try {
          this.feedbacksData = data;
          console.log('fetched feedbacks', this.feedbacksData);
        } catch (error) {
          console.error('Error fetching feedbacks:', error);
        }
      },
      error: (err: any) => {
        console.error('Error fetching feedbacks:', err);
      },
    });
  }
}
