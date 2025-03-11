import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from '../../org.service'; // Correct import path as per user feedback

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  is_slidebar: boolean;
  isclick: boolean = false;
  roles: any[];
  det: any = [];
  c_role: any;
  userId: any;
  organizations: any[] = [];
  bloodGroups: any[] = [];
  selectedBloodGroup: any;
  modifyBloodGroupModal: boolean = false;
  addBloodGroupModal = false;

  // newBloodGroup: any = {};
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';
  validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  newUnits: number = 0; // Property for new units input, initialized to 0
  feedbackMessage: string = ''; // Property for user feedback message
  organizationProfile: any;
  bloodGroupsArray: any[] = [];
  org: any;

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private orgService: OrgService
  ) {
    this.is_slidebar = false;
    this.roles = this.activeroute.snapshot.queryParams['roles'];
    this.c_role = this.activeroute.snapshot.queryParams['currentrole'];
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchBloodGroups(this.userId);
    this.fetchOrganizationProfile(this.userId);
  }

  fetchOrganizationProfile(userId: string): void {
    this.orgService.fetchProfileByOrg(userId).subscribe({
      next: (data) => {
        this.organizationProfile = data[0];
        localStorage.setItem(
          'organisation',
          JSON.stringify(this.organizationProfile)
        );
        console.log('OrganizationProfile:', this.organizationProfile);
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

  fetchBloodGroups(userId: any) {
    this.orgService.getBloodGroups(userId).subscribe({
      next: (data: any) => {
        try {
          const bloodGroups = JSON.parse(data[0].blood_groups);
          this.bloodGroups = bloodGroups;
        } catch (error) {
          console.error('Error parsing bloodGroups:', error);
        }
      },
      error: (err) => {
        console.error('Error fetching bloodGroups:', err);
      },
    });
  }

  openProfile(orgId: string): void {
    this.router.navigate(['/org/Profile']);
  }

  modifyBloodGroup(bloodGroup: any) {
    this.selectedBloodGroup = bloodGroup;
    this.modifyBloodGroupModal = true;
  }

  closeModal() {
    this.modifyBloodGroupModal = false;
  }
  newBloodGroup: { bloodGroup: string; quantity: number } = {
    bloodGroup: '',
    quantity: 0
  };

  addBloodGroup(newBloodGroup: any, newBloodQuantity: any) {
    console.log('bloodGroups  ', this.bloodGroups);
    console.log('newBloodGroup:', newBloodGroup);
    console.log('Form Data:', newBloodGroup, newBloodQuantity);
    const existingBloodGroup = this.bloodGroups.find((group) =>
      console.log(newBloodGroup)
    );
    
    if (existingBloodGroup) {
      this.addBloodGroupModal = false;
      this.showPopup = true;
      this.popupMessage = `Blood group already exists!`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500);
      return;
    }
    console.log('New Blood Group:', this.newBloodGroup);
if (!this.newBloodGroup || !this.newBloodGroup.bloodGroup || !this.newBloodGroup.quantity) {
  console.error('newBloodGroup is not properly initialized!');
  return;
}
    if (
      this.validBloodGroups.includes(
        this.newBloodGroup.bloodGroup.toUpperCase()
      )  ) {
      console.log(
        'newBloodGroup ',
        this.newBloodGroup.bloodGroup.toUpperCase()
      );
      this.orgService.addBloodGroup(this.newBloodGroup.bloodGroup, this.newBloodGroup.quantity, this.userId)
    .subscribe({
      next: (data) => {
        console.log("Blood group added successfully:", data);
        this.fetchBloodGroups(this.userId);
      },
      error: (err) => {
        console.error("Error adding blood group:", err);
      }
    });
        //   error: (err: any) => {
        //     console.error('Error adding blood group:', err);
        //   },
        // });
    } else {
      this.addBloodGroupModal = false;
      this.showPopup = true;
      this.popupMessage = `Invalid blood group!`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500);
      return;
    }
  }
  convertQuantityToNumber() {
    this.newBloodGroup.quantity = Number(this.newBloodGroup.quantity);
  }

  openAddBloodGroupModal() {
    this.addBloodGroupModal = true;
  }

  closeAddBloodGroupModal() {
    this.addBloodGroupModal = false;
  }

  updateBloodGroupQuantity() {
    if (
      this.validBloodGroups.includes(
        this.selectedBloodGroup.bloodGroup.toUpperCase()
      )
    ) {
      if (this.selectedBloodGroup.quantity >= 0) {
        this.orgService
          .updateBloodGroupQuantity(
            this.selectedBloodGroup.bloodGroup.toUpperCase(),
            this.selectedBloodGroup.quantity,
            this.userId
          )
          .subscribe({
            next: (data: any) => {
              console.log('Blood group quantity updated successfully:', data);
              this.modifyBloodGroupModal = false;
              this.fetchBloodGroups(this.userId);
            },
            error: (err: any) => {
              console.error('Error updating blood group quantity:', err);
            },
          });
      } else {
        this.showPopup = true;
        this.popupMessage = `Invalid blood quantity!`;
        setTimeout(() => {
          this.showPopup = false;
        }, 2500);
        return;
      }
    } else {
      this.showPopup = true;
      this.popupMessage = `Invalid blood group!`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500);
      return;
    }
  }
}
