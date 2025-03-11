import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-signup',
  templateUrl:'./signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

userId:any
  constructor( private authentication:AuthService,private router:Router)
  {
  }
  signupForm= new FormGroup({
      username:new FormControl ('', [Validators.required]),
      email:new FormControl ('', [Validators.required]),
      password:  new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',[ Validators.required])


  })
    // Custom validator for password match
    passwordMatchValidator(form: FormGroup) {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
  
   onsubmit()
   {
   const username:string=this.signupForm.value.username || '';
   const email:string=this.signupForm.value.email || '';
   const password:string=this.signupForm.value.password || '';
   const confirmpassword:string=this.signupForm.value.confirmPassword || '';
   this.authentication.signUp(username,email,password,confirmpassword).then((res:any)=>
      {
       console.log('signup returned data',res);
        if(res.error==null)
          {
            // this.userId = res.user.id;
            // localStorage.setItem('authId', this.userId);
            alert('Successfully registered ,now you can login');
           this.router.navigateByUrl('/Sign-In');
          }
     else{
      alert(res.error.message);
     }
   }
   )
}
}
