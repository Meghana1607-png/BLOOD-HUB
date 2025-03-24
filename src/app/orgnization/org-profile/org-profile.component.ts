import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css'],
})
export class OrgProfileComponent implements OnInit {
  newBloodGroup: string = ''; // For adding new blood group
  newBloodGroupQuantity: number = 0; // For adding new blood group quantity

  organizationProfile: any;
  userId: any;
  bloodGroupsArray: any[] = [];
  org: any;
  presentPath: any;
  currentPath: any;

  // Error messages
  nameError: string = '';
  emailError: string = '';
  phoneError: string = '';
  bloodGroupError: string = ''; // New error message for blood group

  constructor(
    private orgService: OrgService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.presentPath = this.router.url;
    console.log('presentPath', this.presentPath);
    this.currentPath = this.presentPath.split('?')[0].trim();
    console.log('currentPath', this.currentPath);
    this.userId = localStorage.getItem('userId');
    this.org = localStorage.getItem('organization');
    console.log('organisation', this.org);
  }

  ngOnInit(): void {
    this.fetchOrganizationProfile(this.userId);
  }

  Edit(): void {
    this.router.navigate(['/org/Profile/editProfile'], {
      queryParams: {
        bloodGroupsArray: JSON.stringify(this.bloodGroupsArray),
        organizationProfile: JSON.stringify(this.organizationProfile),
      },
    });
  }

  fetchOrganizationProfile(userId: string): void {
    this.orgService.fetchProfileByOrg(userId).subscribe({
      next: (data) => {
        this.organizationProfile = data[0];
        if (this.organizationProfile && this.organizationProfile.blood_groups) {
          this.bloodGroupsArray = JSON.parse(
            this.organizationProfile.blood_groups
          );
        }
      },
      error: (err) => {
        console.error('Error fetching organization profile:', err);
      },
    });
  }
}
