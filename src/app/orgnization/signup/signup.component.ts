import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from 'src/app/org.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  userId: any;
  orgForm: FormGroup;
  currentStep: number = 1; // Initialize currentStep to 1
  validBloodGroups: string[] = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ]; // List of valid blood groups
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private orgform: OrgService,
    private router: Router
  ) {
    this.orgForm = this.fb.group(
      {
        orgName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', Validators.required], // Added address control
        bloodGroups: this.fb.array([]),
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
    this.userId = localStorage.getItem('userId');
  }

  get bloodGroups(): FormArray {
    return this.orgForm.get('bloodGroups') as FormArray;
  }

  addBloodGroup() {
    const bloodGroupForm = this.fb.group({
      bloodGroup: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
    this.bloodGroups.push(bloodGroupForm);
  }

  removeBloodGroup(index: number) {
    this.bloodGroups.removeAt(index);
  }

  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    // Validate blood groups
    const bloodGroupEntries = this.bloodGroups.controls;
    const invalidBloodGroups: string[] = [];
    const duplicateBloodGroups: string[] = [];
    const bloodGroupValues: string[] = [];
    for (let group of bloodGroupEntries) {
      const bloodGroupValue = group.get('bloodGroup')?.value;
      if (!this.validBloodGroups.includes(bloodGroupValue.toUpperCase())) {
        invalidBloodGroups.push(bloodGroupValue);
      }
      if (bloodGroupValues.includes(bloodGroupValue)) {
        duplicateBloodGroups.push(bloodGroupValue);
      }
      bloodGroupValues.push(bloodGroupValue);
    }
    if (invalidBloodGroups.length > 0) {
      this.showPopup = true;
      this.popupMessage = `Invalid blood group: ${invalidBloodGroups.join(
        ', '
      )}.`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500); // Hide popup after 2 seconds
      return;
    }
    if (duplicateBloodGroups.length > 0) {
      this.showPopup = true;
      this.popupMessage = `Duplicate blood group: ${duplicateBloodGroups.join(
        ', '
      )}. Please remove duplicates.`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500); // Hide popup after 2 seconds
      return; // Prevent form submission
    }

    if (this.orgForm.valid) {
      const formData = this.orgForm.value;
      const bloodGroupsData = formData.bloodGroups.map(
        (group: { bloodGroup: string; quantity: number }) => ({
          bloodGroup: group.bloodGroup,
          quantity: group.quantity,
        })
      );
      if (bloodGroupsData.length === 0) {
        this.showPopup = true;
        this.popupMessage = `Please add at least one blood group.`;
        setTimeout(() => {
          this.showPopup = false;
        }, 2500); // Hide popup after 2 seconds
        return;
      }

      // Include blood groups in the data sent to the backend
      const dataToSend = {
        orgName: formData.orgName,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bloodGroups: bloodGroupsData,
      };

      this.orgform
        .nodeMailer(dataToSend.email, dataToSend.password)
        .pipe(
          switchMap((data: any) => {
            if (data.message === 'Authentication successful') {
              return this.orgform.OrgSignUp(dataToSend);
            } else {
              throw new Error('Invalid email or password');
            }
          })
        )
        .subscribe({
          next: (response: any) => {
            console.log('response.data', response);
            if (response.error) {
              this.orgForm.reset();
              this.currentStep = 1;
              this.showPopup = true;
              this.popupMessage = `User already registered with the email.`;
              setTimeout(() => {
                this.showPopup = false;
              }, 2500); // Hide popup after 2 seconds
              return;
            } else {
              console.log('organisation signup response', response);
              this.userId = response.data.user.id;
              localStorage.setItem('userId', this.userId);
              this.formInsert(formData, bloodGroupsData);
              this.router.navigate(['/org-dashboard']);
            }
          },
          error: (err) => {
            this.showPopup = true;
            this.popupMessage = `Invalid email or password.`;
            setTimeout(() => {
              this.showPopup = false;
            }, 2500); // Hide popup after 2 seconds
            return;
          },
        });
    } else {
      this.showPopup = true;
      this.popupMessage = `Please fill in all required fields.`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500); // Hide popup after 2 seconds
      return;
    }
  }

  formInsert(formData: any, bloodGroupsData: any) {
    const dataToInsert = {
      orgName: formData.orgName,
      password: formData.password,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      bloodGroups: bloodGroupsData,
      userId: this.userId,
    };

    console.log('this.userId ', dataToInsert.userId);

    const res1 = this.orgform.Orginsert(dataToInsert).subscribe({
      next: (response: any) => {
        console.log('organisation insert data', response);
        if (response.error) {
          console.log(
            'User already registered with the email. or data not inserted properly'
          );
        } else {
          this.orgForm.reset();
        }
      },
    });
  }

  goToNextStep() {
    if (
      this.orgForm.get('orgName')?.valid &&
      this.orgForm.get('email')?.valid &&
      this.orgForm.get('password')?.valid &&
      this.orgForm.get('confirmPassword')?.valid
    ) {
      const password = this.orgForm.get('password')?.value;
      const confirmPassword = this.orgForm.get('confirmPassword')?.value;
      if (password !== confirmPassword) {
        this.orgForm.get('confirmPassword')?.setErrors({ mismatch: true });
        return;
      } else {
        this.orgForm.get('confirmPassword')?.setErrors(null);
        this.currentStep = 2; // Move to the next step
      }
    } else {
      this.showPopup = true;
      this.popupMessage = `Please fill in all required fields before proceeding.`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500); // Hide popup after 2 seconds
      return;
    }
  }

  goToPreviousStep() {
    this.currentStep = 1; // Move back to the previous step
  }
}
