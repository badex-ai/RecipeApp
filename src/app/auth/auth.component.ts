import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { AuthService} from './auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import {AlertService} from '../shared/alert/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  signupForm: FormGroup;
  signinForm: FormGroup;
  authenticated:boolean= false;
 // error: string = null;
 isLoadingSignUp:boolean=false;
 isLoadingSignIn:boolean=false;

  constructor(private authService: AuthService,private router: Router, private route:ActivatedRoute, private alertService: AlertService) { }

  signIn: Boolean= true;
  
  ngOnInit(){
    this.signupForm= new FormGroup({
      'username': new FormControl( null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });

    this.signinForm = new FormGroup({
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })

  }

  onSignup(){ 
    if(!this.signupForm.valid){
      return 
    }
    this.isLoadingSignUp=true;

    // console.log(this.signupForm)
    // console.log(this.signupForm.value);
   const password = this.signupForm.value.password;
   const email = this.signupForm.value.email;
   const username = this.signupForm.value.username
  //  console.log(password);
  //  console.log(email);

    this.authService.signUp( password,email,username).subscribe((response)=>{
      // console.log(response)
    this.authenticated = true;
    this.isLoadingSignUp = false;
    setTimeout(()=>{
      this.router.navigate(['../recipes'],{relativeTo: this.route});
   }
     ,10)

   },error=>{
    //this.isLoading=false;
    this.isLoadingSignUp = false;
    let returnedmessage = this.authService.handleError(error);
    this.alertService.alert.next(true);
    this.alertService.message.next(returnedmessage)
   // this.error= errorMessage;
    // console.log(error)
  
  })
  

   this.signupForm.reset()
   
    
  }
  
  onSignin(){
    const password = this.signinForm.value.password;
    const email = this.signinForm.value.email;
    if(!this.signinForm.valid){
      return 
    }
    this.isLoadingSignIn=true;
    this.authService.signIn(email, password).subscribe((response)=>{
        // console.log(response)
        this.authenticated= true;
       
        setTimeout(()=>{
          this.router.navigate(['../recipes'],{relativeTo: this.route});
      }
        ,10)
      },error=>{
      //this.isLoading=false;
      this.isLoadingSignIn=false;
      let returnedmessage = this.authService.handleError(error);
      this.alertService.alert.next(true);
      this.alertService.message.next(returnedmessage)
     // this.error= errorMessage;
      // console.log(error)
    
    }
    )
   // console.log(this.signinForm.value);
    this.signinForm.reset()
    
  }

  onclickSignUp(){
    this.signIn= !this.signIn;
    this.signupForm.reset()
  }
  onclickSignIn(){
    this.signIn=true;
    this.signinForm.reset()
  }

  onClickRemember(value:boolean){
    this.authService.saveLoginInfo(value)
  }
}
