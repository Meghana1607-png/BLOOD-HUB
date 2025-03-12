import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  userId: any;
  bloodGroupsArray: any[] = [];
  org: any;
  newBloodGroup: string = ''; // For adding new blood group
  newBloodGroupQuantity: number = 0; // For adding new blood group quantity

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
    this.userId = localStorage.getItem('userId');
    this.org = localStorage.getItem('organization');
  }

  
  async ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.organizationProfile = {
        bloodGroupsArray: JSON.parse(params['bloodGroupsArray']),
        organization: JSON.parse(params['organizationProfile']),
      };
      this.bloodGroupsArray = this.organizationProfile.bloodGroupsArray;
    });
  }  
  
  organizationProfile: {
    bloodGroupsArray: any;
    organization: any;
  } = {
    bloodGroupsArray: '',
    organization: '',
  };

  addBloodGroup(): void {
    this.bloodGroupError = ''; // Reset blood group error message
    if (this.newBloodGroup && this.newBloodGroupQuantity > 0) {
      const exists = this.bloodGroupsArray.some(
        (bg) => bg.bloodGroup === this.newBloodGroup
      );
      if (!exists) {
        this.bloodGroupsArray.push({
          bloodGroup: this.newBloodGroup,
          quantity: this.newBloodGroupQuantity,
        });
        this.newBloodGroup = '';
        this.newBloodGroupQuantity = 0;
      } else {
        this.bloodGroupError = 'Blood group already exists.';
      }
    } else {
      this.bloodGroupError = 'Please enter a valid blood group and quantity.';
    }
  }

  removeBloodGroup(bloodGroupToRemove: string): void {
    this.bloodGroupsArray = this.bloodGroupsArray.filter(
      (bg) => bg.bloodGroup !== bloodGroupToRemove
    );
  }

  validateProfile(): boolean {
    this.nameError = '';
    this.emailError = '';
    this.phoneError = '';
    this.bloodGroupError = ''; // Reset blood group error message

    const nameValid =
      this.organizationProfile.organization.name &&
      this.organizationProfile.organization.name.trim() !== '';
    const emailValid = this.validateEmail(this.organizationProfile.organization.email);
    const phoneValid = this.validatePhone(this.organizationProfile.organization.phone);

    if (!nameValid) {
      this.nameError = 'Name is required.';
    }
    if (!emailValid) {
      this.emailError = 'Please enter a valid email address.';
    }
    if (!phoneValid) {
      this.phoneError =
        'Phone number must be numeric and at least 10 digits long.';
    }

    return nameValid && emailValid && phoneValid;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  validatePhone(phone: string): boolean {
    const phonePattern = /^[0-9]{10,}$/; // At least 10 digits
    return phonePattern.test(phone);
  }

  saveProfile(): void {
    if (this.validateProfile()) {
      this.organizationProfile.organization.blood_groups = JSON.stringify(
        this.bloodGroupsArray
      );

      this.orgService
        .updateProfile(this.organizationProfile, this.userId)
        .subscribe({
          next: (response: any) => {
            console.log('Profile updated successfully:', response);
            this.router.navigate(['/org/Profile']);
          },
          error: (err: any) => {
            console.error('Error updating profile:', err);
          },
        });
    }
  }
}
