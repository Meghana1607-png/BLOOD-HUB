import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from 'src/app/org.service';
import { Router } from '@angular/router';
import { DonorserveiceService } from 'src/app/donorserveice.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  userId: any;
  orgForm: FormGroup;
  currentStep: number = 1; // Initialize currentStep to 1
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private orgform: OrgService,
    private router: Router,
    private Donorservice: DonorserveiceService
  ) {
    this.orgForm = this.fb.group(
      {
        orgName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', Validators.required], // Added address control
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
    this.userId = localStorage.getItem('userId');
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
    if (this.orgForm.valid) {
      const formData = this.orgForm.value;
      const dataToSend = {
        orgName: formData.orgName,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      };

      // this.orgform.nodeMailer(dataToSend.email, dataToSend.password).subscribe({
      //   next: (data: any) => {
      //     if (data.message === 'Authentication successful') {
      this.orgform.OrgSignUp(dataToSend).subscribe({
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
            console.log('donor signup response', response);
            this.userId = response.data.user.id;
            localStorage.setItem('donorId', this.userId);
            this.formInsert(formData);
            this.router.navigate(['/donor/dashboard']);
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
      //     } else {
      //       this.showPopup = true;
      //       this.popupMessage = `Invalid email or password.`;
      //       setTimeout(() => {
      //         this.showPopup = false;
      //       }, 2500); // Hide popup after 2 seconds
      //       return;
      //     }
      //   },
      //   error: (err) => {
      //     this.showPopup = true;
      //     this.popupMessage = `Invalid email or password.`;
      //     setTimeout(() => {
      //       this.showPopup = false;
      //     }, 2500); // Hide popup after 2 seconds
      //     return;
      //   },
      // });
    } else {
      this.showPopup = true;
      this.popupMessage = `Please fill in all required fields.`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500); // Hide popup after 2 seconds
      return;
    }
  }

  // onSubmit() {

  //   if (this.orgForm.valid) {
  //     const formData = this.orgForm.value;
  //     const dataToSend = {
  //       orgName: formData.orgName,
  //       password: formData.password,
  //       email: formData.email,
  //       phone: formData.phone,
  //       address: formData.address,
  //     };

  //     this.orgform
  //       .nodeMailer(dataToSend.email, dataToSend.password)
  //       .pipe(
  //         switchMap((data: any) => {
  //           if (data.message === 'Authentication successful') {
  //             return this.orgform.OrgSignUp(dataToSend);
  //           } else {
  //             throw new Error('Invalid email or password');
  //           }
  //         })
  //       )
  //       .subscribe({
  //         next: (response: any) => {
  //           console.log('response.data', response);
  //           if (response.error) {
  //             this.orgForm.reset();
  //             this.currentStep = 1;
  //             this.showPopup = true;
  //             this.popupMessage = `User already registered with the email.`;
  //             setTimeout(() => {
  //               this.showPopup = false;
  //             }, 2500); // Hide popup after 2 seconds
  //             return;
  //           } else {
  //             console.log('organisation signup response', response);
  //             this.userId = response.data.user.id;
  //             localStorage.setItem('userId', this.userId);
  //             this.formInsert(formData);
  //             this.router.navigate(['/org-dashboard']);
  //           }
  //         },
  //         error: (err) => {
  //           this.showPopup = true;
  //           this.popupMessage = `Invalid email or password.`;
  //           setTimeout(() => {
  //             this.showPopup = false;
  //           }, 2500); // Hide popup after 2 seconds
  //           return;
  //         },
  //       });
  //   } else {
  //     this.showPopup = true;
  //     this.popupMessage = `Please fill in all required fields.`;
  //     setTimeout(() => {
  //       this.showPopup = false;
  //     }, 2500); // Hide popup after 2 seconds
  //     return;
  //   }
  // }

  formInsert(formData: any) {
    const dataToInsert = {
      orgName: formData.orgName,
      password: formData.password,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      userId: this.userId,
    };

    console.log('this.userId ', dataToInsert.userId);

    const res1 = this.Donorservice.donorinsertInUser(
      dataToInsert.userId,
      dataToInsert.orgName,
      dataToInsert.email,
      dataToInsert.phone,
      dataToInsert.address
    ).subscribe({
      next: (response: any) => {
        console.log('donor insert data', response);
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
