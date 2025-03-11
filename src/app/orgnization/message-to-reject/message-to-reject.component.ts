import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-message-to-reject',
  templateUrl: './message-to-reject.component.html',
  styleUrls: ['./message-to-reject.component.css'],
})
export class MessageToRejectComponent {
  userId: any;
  message: string = '';
  org: any;
  organisation: any;

  constructor(
    private orgService: OrgService,
    private router: Router,
    private active: ActivatedRoute
  ) {
    this.userId = localStorage.getItem('userId');
    this.org = localStorage.getItem('organisation');
    if (this.org) {
      this.organisation = JSON.parse(this.org);
    }
    console.log(
      'organisation details in sending message module',
      this.organisation
    );
  }

  async ngOnInit() {
    this.active.queryParams.subscribe((params) => {
      this.receiver = {
        id: params['userid'],
        email: params['email'],
        name: params['name'],
      };
    });
  }

  receiver: {
    id: any;
    email: any;
    name: any;
  } = {
    id: '',
    email: '',
    name: '',
  };

  rejectReceiver(userId: any, message: string): void {
    this.orgService
      .rejectReceiver(
        userId,
        message,
        this.receiver.email,
        this.organisation,
        this.receiver.name
      )
      .subscribe({
        next: (data: any) => {
          console.log('rejectReceiverData:', data);
          this.router.navigate(['/org-dashboard']);
        },
        error: (err: any) => {
          console.error('error in rejecting the receiver', err);
        },
      });
  }
}
