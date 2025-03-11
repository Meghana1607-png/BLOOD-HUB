import { Component } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-individual-feedback',
  templateUrl: './individual-feedback.component.html',
  styleUrls: ['./individual-feedback.component.css'],
})
export class IndividualFeedbackComponent {
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
    this.active.queryParams.subscribe((params) => {
      this.feedback = {
        donorReceiverId: params['id'],
      };
    });
    console.log('this.feedback.donorReceiverId', this.feedback.donorReceiverId);
    this.fetchIndividualFeedbacks(
      this.organisation,
      this.feedback.donorReceiverId
    );
  }

  feedback: {
    donorReceiverId: any;
  } = {
    donorReceiverId: '',
  };

  fetchIndividualFeedbacks(organisation: any, donorReceiver: any) {
    this.orgService
      .fetchIndividualFeedbacks(organisation.userId, donorReceiver)
      .subscribe({
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
