import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-view-receiver',
  templateUrl: './view-receiver.component.html',
  styleUrls: ['./view-receiver.component.css'],
})
export class ViewReceiverComponent {
  receiverDetails: any;
  acceptReceiverData: any;
  userId: any;
  bloodGroups: any[] = [];
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';
  rejectReceiverData: any;
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
        org_id: params['org_id'],
        email: params['email'] || '',
        // status: params['status'] || '',
      };
    });
    this.fetchReceiverDetails(this.receiver.id);
  }

  fetchReceiverDetails(userId: string): void {
    this.orgService.fetchReceiverDetails(userId).subscribe({
      next: (data: any) => {
        this.receiverDetails = data;
        console.log('receiverDetails:', this.receiverDetails);
      },
      error: (err: any) => {
        console.error('Error fetching receiver details:', err);
      },
    });
  }
  receiver: {
    id: any;
    org_id: any;
    // name: string;
    email: any;
  } = {
    id: '',
    org_id: '',
    // name: '',
    email: '',
  };

  rejectReceiver(userId: any): void {
    this.router.navigate(['/org/receiver/MessageToReject'], {
      queryParams: {
        userid: userId,
        email: this.receiver.email,
        name: this.receiverDetails[0].name,
      },
    });
  }

  acceptReceiver(userId: any): void {
    this.orgService.getBloodGroups(this.userId).subscribe({
      next: (data: any) => {
        try {
          const bloodgroups = JSON.parse(data[0].blood_groups);
          this.bloodGroups = bloodgroups;
          // Find the matched blood group
          const matchedBloodGroup = this.bloodGroups.find(
            (group: any) =>
              group.bloodGroup.toUpperCase() ===
              this.receiverDetails[0].blood_group.toUpperCase()
          );

          console.log('matchedGroup', matchedBloodGroup);
          console.log('receiver details:', this.receiverDetails);

          if (matchedBloodGroup) {
            const quantity = parseInt(
              this.receiverDetails[0].blood_quatity.trim()
            );

            // Update the matched blood group's quantity
            matchedBloodGroup.quantity -= quantity;

            if (matchedBloodGroup.quantity >= 0) {
              this.orgService
                .updateBloodGroupQuantity(
                  this.receiverDetails[0].blood_group.toUpperCase(),
                  matchedBloodGroup.quantity,
                  this.userId
                )
                .subscribe({
                  next: (data: any) => {
                    this.orgService
                      .acceptReceiver(
                        userId,
                        this.receiver.email,
                        this.organisation,
                        this.receiverDetails[0].name
                      )
                      .subscribe({
                        next: (data: any) => {
                          this.acceptReceiverData = data;
                          console.log(
                            'acceptReceiverData:',
                            this.acceptReceiverData
                          );
                          this.router.navigate(['/org-dashboard']);
                        },
                        error: (err: any) => {
                          console.error('error in accepting the receiver', err);
                        },
                      });
                  },
                  error: (err: any) => {
                    console.error('Error updating blood group quantity:', err);
                  },
                });

              console.log('userId in updating bloodGroups:', userId);
            } else {
              this.showPopup = true;
              this.popupMessage = `Insufficient quantity.`;
              setTimeout(() => {
                this.showPopup = false;
              }, 2500); // Hide popup after 2 seconds
              return;
            }
          } else {
            this.showPopup = true;
            this.popupMessage = `No matched blood group found.`;
            setTimeout(() => {
              this.showPopup = false;
            }, 2500); // Hide popup after 2 seconds
            return;
          }
        } catch (error) {
          console.error('Error parsing bloodGroups:', error);
        }
      },
      error: (err) => {
        console.error('Error fetching bloodGroups:', err);
      },
    });
  }
}
