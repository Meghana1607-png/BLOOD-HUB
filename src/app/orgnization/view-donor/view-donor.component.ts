import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-view-donor',
  templateUrl: './view-donor.component.html',
  styleUrls: ['./view-donor.component.css'],
})
export class ViewDonorComponent {
  donorDetails: any;
  acceptDonorData: any;
  userId: any;
  bloodGroups: any[] = [];
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';
  rejectDonorData: any;
  currentPath: any;
  presentPath: any;
  requestDonorData: any;
  organization: any;
  dataToSend: any;
  org: any;
  organisation: any;

  constructor(
    private orgService: OrgService,
    private router: Router,
    private active: ActivatedRoute
  ) {
    this.presentPath = this.router.url;
    console.log('presentPath', this.presentPath);
    this.currentPath = this.presentPath.split('?')[0].trim();
    console.log('currentPath', this.currentPath);
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
      this.donor = {
        donor_id: params['id'],
        id: params['org_id'],
        email: params['email'] || '',
        status: params['status'] || '',
      };
    });

    console.log('userId in fetching details:', this.donor.donor_id);

    this.fetchDonorDetails(this.donor.donor_id);
    this.fetchProfileByOrg(this.userId);
  }

  fetchDonorDetails(userId: string): void {
    this.orgService.fetchDonorDetails(userId).subscribe({
      next: (data: any) => {
        this.donorDetails = data;
        console.log('donorDetails:', this.donorDetails);
      },
      error: (err: any) => {
        console.error('Error fetching donor details:', err);
      },
    });
  }
  donor: {
    donor_id: any;
    id: any;
    status: any;
    email: any;
  } = {
    donor_id: '',
    id: '',
    status: '',
    email: '',
  };

  rejectDonor(userId: string): void {
    this.router.navigate(['/org/donor/MessageToReject'], {
      queryParams: {
        userid: userId,
        email: this.donor.email,
        donorName: this.donorDetails[0].Name,
      },
    });
  }

  fetchProfileByOrg(userId: string): void {
    this.orgService.fetchProfileByOrg(userId).subscribe({
      next: (data) => {
        this.organization = data[0];
        console.log('organization:', this.organization);
        this.dataToSend = {
          email: this.organization.email,
          org_id: this.organization.userId,
          status: 'pending',
          donor_id: this.donor.donor_id,
        };
      },
      error: (err) => {
        console.error('Error fetching organization profile:', err);
      },
    });
  }

  requestDonor(userId: string): void {
    const dataToSendJson = JSON.stringify(this.dataToSend);
    this.router.navigate(['/org/donor/MessageToRequest'], {
      queryParams: {
        userid: userId,
        email: this.donor.email,
        dataToSend: dataToSendJson,
        donorName: this.donorDetails[0].Name,
      },
    });
  }

  acceptDonor(userId: any): void {
    this.orgService.getBloodGroups(this.userId).subscribe({
      next: (data: any) => {
        try {
          const bloodGroups = JSON.parse(data[0].blood_groups);
          this.bloodGroups = bloodGroups;

          // Check if the blood group is valid
          const validBloodGroups = [
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-',
          ];
          const donorBloodGroup = this.donorDetails[0].BloodGroup.toUpperCase();

          if (!validBloodGroups.includes(donorBloodGroup)) {
            this.showPopup = true;
            this.popupMessage = `Invalid blood group: ${donorBloodGroup}`;
            setTimeout(() => {
              this.showPopup = false;
            }, 2500);
            return;
          }

          // Find the matched blood group
          const matchedBloodGroup = this.bloodGroups.find(
            (group: any) => group.bloodGroup.toUpperCase() === donorBloodGroup
          );

          console.log('matchedGroup', matchedBloodGroup);

          if (matchedBloodGroup) {
            // Update the matched blood group's quantity
            const quantity = parseInt(this.donorDetails[0].blood_quantity);
            matchedBloodGroup.quantity += quantity;

            this.orgService
              .updateBloodGroupQuantity(
                donorBloodGroup,
                matchedBloodGroup.quantity,
                this.userId
              )
              .subscribe({
                next: (data: any) => {
                  this.orgService
                    .acceptDonor(
                      userId,
                      this.donor,
                      this.organisation,
                      this.donorDetails[0].Name
                    )
                    .subscribe({
                      next: (data: any) => {
                        this.acceptDonorData = data;
                        console.log('acceptDonorData:', this.acceptDonorData);
                        this.router.navigate(['/org-dashboard']);
                      },
                      error: (err: any) => {
                        console.error('error in accepting the donor', err);
                      },
                    });
                },
                error: (err: any) => {
                  console.error('Error updating blood group quantity:', err);
                },
              });
          } else {
            // Add new blood group
            console.log('donorBloodGroup,', donorBloodGroup);
            console.log(
              'donorbloodQuantity,',
              parseInt(this.donorDetails[0].blood_quantity.trim())
            );

            this.orgService
              .addBloodGroup(
                donorBloodGroup,
                parseInt(this.donorDetails[0].blood_quantity.trim()),
                this.userId
              )
              .subscribe({
                next: (data: any) => {
                  this.orgService
                    .acceptDonor(
                      userId,
                      this.donor,
                      this.organisation,
                      this.donorDetails[0].Name
                    )
                    .subscribe({
                      next: (data: any) => {
                        this.acceptDonorData = data;
                        console.log('acceptDonorData:', this.acceptDonorData);
                        this.router.navigate(['/org-dashboard']);
                      },
                      error: (err: any) => {
                        console.error('error in accepting the donor', err);
                      },
                    });
                },
                error: (err: any) => {
                  console.error('Error adding new blood group:', err);
                },
              });
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
