import { Component, Injectable, Input, NgZone, OnInit } from '@angular/core';
import {SettingsService} from './settings.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import{AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../auth/auth.service';
import { environment} from '../../environments/environment';
//import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../auth/user.model';
import firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import {AlertService} from '../shared/alert/alert.service';




import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input()
  responses: Array<any>;
  imageUrl:string;
  deactivateClicked: boolean;

  loadingUpdate: boolean;
   hasBaseDropZoneOver: boolean = false;
   uploader: FileUploader;
   title: string;
 //  user1;
  image: string;
  response: any;
  uploadProgress;
  imgEditClicked:boolean;
  userForm: FormGroup;
  userInfo: any;
  oldPasswordForm: FormGroup;
  newPasswordForm: FormGroup;
  file: File;

  settingsClicked:boolean;
  passwordAuthenticated:boolean= false;
  editmode: boolean;
  userState;
  usersCollection;
 // responses;
  user:User;
 

  

  passwordEditClicked:boolean ;
  loadingPassCheck:boolean;
  aboutEditClicked:boolean;
  selectedFile: File;


  



   
 
  constructor(private settingsService: SettingsService, private router: Router, private route: ActivatedRoute,private afAuth: AngularFireAuth,
    private authService: AuthService,private firestore: AngularFirestore,  
     public fb: FormBuilder,
     private httpClient: HttpClient,
     private alertService : AlertService
    
    ) {
      this.usersCollection = this.firestore.collection('Users');
      this.responses = [];
      this.title = '';
     }

  ngOnInit() {

     
    

    // this.afAuth.onAuthStateChanged(function(user){
    //   if(user){
    //     this.userState= user;
    //     console.log(this.userState)
    //   }
    //   else{}
    // })

    


    this.authService.user.subscribe((user)=>{
     // let userCase;
       this.user = {...user};
       console.log(this.user)
        this.image= user.photoURL;


       if(!user){
        this.authService.checkSession();
        
       
     }
      // console.log(this.user)






     })


     this.authService.getUserDbInfo(this.user.userId).subscribe(
      result=>{
      //  console.log(result);
        this.userInfo= result
      }
    )

    // this.authService.userDbInfo.subscribe(
    //   (userDbInfo)=>{
    //     this.userInfo= userDbInfo;
    //     console.log(this.userInfo)
    //   }
    // )



    // this.settingsService.getUser(this.user.userId).subscribe(
    //   value=>{
    //     this.userInfo = value;
    //     console.log(this.userInfo)
    //   }
    // )



    this.settingsService.settingsClicked.subscribe( value=>{
      this.settingsClicked = value;
     // console.log(this.settingsClicked)
    });

    // this.authService.user.subscribe(user=>{
    //   this.user= user;
    // })
    this.route.params.subscribe((params:Params)=>{
      this.settingsClicked = true;
      this.settingsService.settingsClicked.next(this.settingsClicked);
     // console.log(this.userInfo);
    })

    // this.uploadForm = this.fb.group({
    //   avatar: [null],
    //   name: ['']
    // })

    this.userForm = this.fb.group({

      username: [this.user.displayName, Validators.required],
      about: ['', Validators.required],
     // imgUrl: [this.user.photoUrl, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]



    })










    this.oldPasswordForm = this.fb.group({

      oldPassword: [null, Validators.required],


    })


    





   



  }


 

  

  addImage(event){

    this.file = (event.target as HTMLInputElement).files[0];
    console.log(this.file);
   let ext= this.file.name.split('.')[1];
  let name = this.file.name.split('.')[0];
 // console.log(this.file.name.split('.'))
  if(ext == 'jpg' || ext == 'jpeg'){

    this.selectedFile = this.file;
    // this.userForm.patchValue({
    //   'imgUrl': this.selectedFile
    // });
    //this.userForm.get('imgUrl').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile)
    reader.onload = () => {
      this.image = reader.result as string;
    }
    
   // this.imgEditClicked= true;
    
   
    
  }else{
    this.selectedFile = null;
  }
//  console.log(this.selectedFile);

 }

  uploadImage(){
   





   // const CLOUDINARY_UPLOAD_PRESET= "zldpirvq"
    const formData = new FormData();
   // const bool= true;
    
  
// console.log(this.selectedFile);
  formData.append('file', this.selectedFile);
  formData.append('upload_preset', environment.CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'recipeApp/users');
 // formData.append('colors', JSON.stringify(true) );
//  formData.append('colors', true);

 // console.log(formData.forEach(value=>{console.log(value)}));


 return new Promise((resolve, reject) => {
  this.httpClient.post("https://api.cloudinary.com/v1_1/dkxbadex/image/upload", formData
  

         
           )
    .subscribe(res => {
      if(res) {
        resolve(res);
        console.log(res);
        this.response = res;
        //  console.log(res);
        //  console.log(typeof(this.response.url)) 
          this.imageUrl = this.response.url;
          const user = {
           email:this.user.email,
           userId:this.user.userId,
           expDate: new Date(),
           displayName: this.userForm.value.username,
           photoURL: this.imageUrl
         }
          console.log(user);
          this.authService.user.next( user )
          console.log(this.imageUrl)
     
          sessionStorage.setItem("tempUser", JSON.stringify(user))
        //return this.response.url
      }
     // console.log(this.uploadProgress);
   

      
      
      
     
      // alert('Uploaded Successfully.');
    })
 })

  



    
  
  }



  

   async onUpdateUser(){
this.loadingUpdate= true
    let newPassword= this.userForm.value.newPassword;
    
   
    if(this.file || this.userForm.value.username){
      let editedInfo = new Object();
      if(this.file){
    //    editedInfo.photoURL= this.imageUrl;
        await this.uploadImage();
         
      }

      if(this.userForm.value.username){
      //  editedInfo.displayName= this.userForm.value.username;
      }    
                                                                        
    let user1 = this.afAuth.currentUser;
    
      
    (await user1).updateProfile(editedInfo).then(()=>{
        //  console.log(result);
        //  let updatedInfo = new User{
        //   userInfo2.email,
        //   userData.userId,
        //   userData.expirationDate,
        //   userData.displayName,
        //   userData.photoURL

        //  }
        this.alertService.alert.next(true);
       // this.authService.user.next()
        this.alertService.message.next("User info update successfull")
          console.log('username changed ')
         // console.log(result)
          console.log('update successful')
        }
        ).catch((error)=>{
          let returnedmessage =this.authService.handleError(error);
          this.alertService.alert.next(true);
          this.alertService.message.next(returnedmessage);
        //  console.log(error)
          this.resetValues();
          console.log("An error happened.") 
        });
      
      // sessionStorage.setItem("tempUser", JSON.stringify(user))
     }

    if(newPassword){
      var user1 = this.afAuth.currentUser;
      
      (await user1).updatePassword(newPassword).then(function() {
        
        console.log('password Changed!!');
        this.authService.signIn(this.user.email,newPassword);
        this.alertService.alert.next(true);
        this.alertService.message.next("Password updated successfully")
     
       }).catch(error=>{
         this.alertService.alert.next(true);
         let response= this.authService.handleError(error);
         this.alertService.message.next(response);
         console.log(error)
       });
    }
  
    

  // // this.postFile(this.file).subscribe(data => {
  // //   // do something, if upload success
  // //   }, error => {
  // //     console.log(error);
  // //   });

    // if(this.file){
    //   (await user1).updateProfile({
    //     displayName: this.userForm.value.username,
    //     photoURL: this.imageUrl
    //   }).then(function() {
    //   //  console.log(this.imageUrl)
    //     console.log('update successful')
    //   }).catch(function(error) {
    //     console.log(error)
    //     console.log("An error happened.") 
    //   });
    // }
  
   // console.log(this.image)

   


  // localStorage.setItem('userData',JSON.stringify(user))
    if(this.aboutEditClicked == true  && this.userForm.value.username){
      this.usersCollection.doc(this.user.userId).set(
        {
          username: this.userForm.value.username,
          about: this.userForm.value.about
    
      }
      );
    }

    this.aboutEditClicked = false;
    this.passwordEditClicked= false;
    this.loadingUpdate= false;
    
  


   //this.afAuth.updateCurrentUser()

  }


 async onClickDeactivate(){
    this.passwordEditClicked= true
    this.deactivateClicked= true;
    this.passwordAuthenticated= false;
    this.oldPasswordForm.reset();
    
    
  }

  resetValues(){
    this.userForm.patchValue(
      {username: this.user.displayName}
    );
    this.image= this.user.photoURL
  }



  onClickPasswordEdit(){
    this.editmode= !this.editmode;
    this.deactivateClicked= false;
    console.log(this.deactivateClicked);
    this.passwordEditClicked= !this.passwordEditClicked;
    this.passwordAuthenticated= false;
    this.oldPasswordForm.reset()




   // this.afAuth.sendPasswordResetEmail;
   // console.log(this.user);
  // const newPassword = getASecureRandomPassword();


  }

  async onCheckPassword(){
    this.loadingPassCheck = true;
    let email = this.user.email;
    let password = this.oldPasswordForm.value.oldPassword
   // console.log(this.oldPasswordForm.value.oldPassword);


     const credential = firebase.auth.EmailAuthProvider.credential(email, password);
   //  console.log(credential);
    // firebase.default.auth
     let user1 = this.afAuth.currentUser;
   //   console.log(user1)


        const result = (await user1).reauthenticateWithCredential(credential).catch(error=>{
          console.log(error);
          this.loadingPassCheck= false;
        
          this.alertService.alert.next(true);
          if(error.code=="auth/wrong-password"){
            this.alertService.message.next("Incorrect password, retry");
          }else{
            let response= this.authService.handleError(error);
            this.alertService.message.next(response);
          }
          
          //this.alertService.message
          console.log(error.message)
        });

        result.then(async user=>{
          if(user){
            this.loadingPassCheck= false;
            if(this.deactivateClicked){
              
            let  result= confirm("Are you sure you want to delete account?");

            if(result){
              this.usersCollection.doc(`${this.user.userId}`).delete();
              (await user1).delete().then(()=> {
                
                sessionStorage.clear();
                this.authService.user.next(null);
                localStorage.removeItem('userData');
                this.router.navigateByUrl('/login');
                
                
               
             console.log(" Account deleted ")
             
              })
            }else{
              console.log(this.user.userId)
              return 
            }
              
             // let user1 = this.afAuth.currentUser;
           ;


             
            }else{
               this.passwordAuthenticated= true
            }
          
          }else{
            this.passwordAuthenticated = false;
          }
          
          console.log("ok okay")
        }).catch(function(error) {
          this.loadingPassCheck= false;

          console.log(error.message)
          console.log("Error occurred")
         })

  }
  onClickCancel(){
    this.resetValues();
  //  this.userForm.patchValue(
  //   {username: this.user.displayName}
  // );
 
  }

  onClickAboutEdit(){


      // this.userForm = new FormGroup({

      //   'username': new FormControl(this.user.displayName, Validators.required),
      //   'about': new FormControl(this.userInfo.about, Validators.required),
      //   'imgUrl': new FormControl(this.user.photoUrl, Validators.required),
      //   'newPassword': new FormControl(null,Validators.required),
      //   'confirmPassword': new FormControl(null, Validators.required)


      // })
      this.userForm.patchValue({
        'about': this.userInfo.about
      });


    this.aboutEditClicked = !this.aboutEditClicked;
   // var user1 = this.afAuth.currentUser;
  //  console.log(user1)
  }

  // this.reauthenticate(currentPassword).then(() => {
  //   var user = firebase.auth().currentUser;
  //   user.updatePassword(newPassword).then(() => {
  //     console.log("Password updated!");
  //   })




  get f(){
    return this.userForm.controls;
  }

 



//   postFile(fileToUpload: File): Observable<boolean> {
//     const endpoint = 'your-destination-url';
//     const formData: FormData = new FormData();
//     formData.append('fileKey', fileToUpload, fileToUpload.name);
//     return this.httpClient
//       .post(endpoint, formData, {
//               reportProgress: true,
//               observe: 'events'
//             },
//           //  { headers: yourHeadersConfig }
//             ).pipe(
//               catchError((e) =>
//             console.log( `${e}`+'occured')),
//               map(() => { return true; })
//             )


// }



handleError(){}

  
}
