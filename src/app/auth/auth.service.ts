import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { User} from '../shared/models/user.model';
import { BehaviorSubject, from, of, Subject, throwError } from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router'
import{AngularFireAuth} from '@angular/fire/auth';
import {AlertService} from '../shared/alert/alert.service';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';


// export interface AuthResponseData{
//     displayName: string;
//     kind: string,
//     idToken:string ,
//     email:string ,
//     refreshToken: string, 
//     expiresIn: string,
//     localId:string,
//     registered?:boolean,
//     passwordHash?:string,
//     prociderUserInfo?:Object[];

// }

@Injectable({
  providedIn: 'root'
})

export class AuthService {

 user= new BehaviorSubject<User>(null);
// cancelUser = new Subject;
 
// user = new Subject ;
 userDbInfo= new BehaviorSubject<any>(null);
  rememberMe :boolean;
 
 // logOutclicked: boolean = false;
  tokenExpirationTimer:any;
  usersCollection: AngularFirestoreCollection<any>;
  inventoryCollection: AngularFirestoreCollection<any>;
 
  

  constructor(private http: HttpClient,private router:Router,private firestore: AngularFirestore,private afAuth: AngularFireAuth, private alertService: AlertService ) {
    this.usersCollection = this.firestore.collection('Users');
    this.inventoryCollection = this.firestore.collection('Inventory');
    
   // console.log(this.recipesCollection)
   }

  signUp(password:string, email:string,displayName:string){
    
// user.sendEmailVerification().then(function() {
//   // Email sent.
// }).catch(function(error) {
//   // An error happened.
// });

    return from(this.afAuth.createUserWithEmailAndPassword(email,password))
    
  //  return this.http.post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseConfig.apiKey,
  //     { 
  //       displayName:displayName,
  //       password:password,
  //       email: email,
  //       photoUrl:"../../assets/images/chefimg.jpg",
  //       returnSecureToken: true
  //     }
  //   )
    .pipe(
  //     catchError(
  //    this.handleError
     
    
  //  ),
    tap((resData)=>{
    //  console.log(resData);
      let userInfo = resData.user;
     // console.log(userInfo);
      this.usersCollection.doc(userInfo.uid).set({
        username: displayName,
        about: "About me"
       
    });
 // this.inventoryCollection.doc(userInfo.uid).set({})
      // console.log(resData.user);
      const avi= "../../assets/images/defaultavi.jpg"
    const name =  resData.user.updateProfile({
        displayName: displayName,
        photoURL: avi
      });
    //  console.log(name)inven
      
   
    
    let date = Date.now() + 345600000;
  
   
    const expDate = new Date(date)
  
   

  // resData.idToken
 //  console.log(resData);
    this.handleAuthentication(
      userInfo.email,
      userInfo.uid,
      +expDate,
      displayName,
      avi,

      )


      return userInfo
    
      // this.handleAuthentication(
      //   resData.email,
      //   resData.idToken,
      //   +resData.expiresIn,
      //   resData.localId,
      //   resData.displayName
      //   )
  //       this.usersCollection.doc(`${resData.localId}`).set({
  //     username: `${resData.displayName}`,
  //     about: "About me",
  //     image: "../../assets/images/chefimg.jpg",
  //   //  password: `${pass}`
  // })
      
  })
    )
  }


  



  signIn(loginEmail:string,loginPassword:string){

    return from(this.afAuth.signInWithEmailAndPassword(loginEmail,loginPassword))
    




  //  return this.http.post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseConfig.apiKey,
  //     {
  //       email:loginEmail,
  //       password:loginPassword,
  //       returnSecureToken: true
  //     }
  //   )
    .pipe(
      
      
    tap(
      // if(resData)
      (resData)=>{
       // this.checkAuthentication()
      //  console.log(resData.user.email);
      // this.afAuth.onAuthStateChanged(function(user){
       
      //  // console.log(value)
      // })
     
      var user = this.afAuth.currentUser;
      // console.log(user);
        let userInfo= resData.user;
        this.getUserDbInfo(userInfo.uid)
       // console.log(userInfo);
        let date = Date.now() + 345600000;
      
       let tempUser;
       ;
       const {email,uid,displayName,photoURL} = userInfo;
       let userId= uid;
       const expDate = new Date(date)
          tempUser = {
            email,
            userId,
            expDate,
            displayName,
            photoURL
          };
          console.log(tempUser)
       
       
       
        
       // console.log(expDate)
       
       // Store
         sessionStorage.setItem("tempUser", JSON.stringify(tempUser));

      // resData.idToken
     //  console.log(resData);
        this.handleAuthentication(
          userInfo.email,
          userInfo.uid,
          +expDate,
          userInfo.displayName,
          userInfo.photoURL
        )
     }
   )
  
   )
  }

 


          AutoLogin(){

            
            //var user = this.afAuth.currentUser;
           // console.log(user);
            

            
          //   this.afAuth.onAuthStateChanged(function(value){
          //  // console.log(value);
            
           
          //  })
            
            const userData:{
              email:string,
              userId: string,
              expirationDate: Date,
              displayName: string,
              photoURL: string 
            } = JSON.parse(localStorage.getItem('userData'));
            

          //console.log(userData); 
            if(!userData){
              return 
            }

            const loadedUser = new User(
              userData.email,
              userData.userId,
              userData.expirationDate,
              userData.displayName,
              userData.photoURL
            );
          //  // console.log(loadedUser)

            if(loadedUser.userId){
              this.user.next(loadedUser);
                  const expirationDuration = new Date(loadedUser.expDate).getTime() - new Date().getTime() ;
                // this.autoLogout(expirationDuration);
            }
          
          //  console.log(user1);
            

          }
  





  saveLoginInfo(value){
    this.rememberMe = value;
    
  }

  autoLogout(expirationDuration){
    this.tokenExpirationTimer = setTimeout(()=>{this.logout()}, expirationDuration)
  
  }



  getUserDbInfo(userId){
    return this.usersCollection.doc(userId).valueChanges()
  }

  logout(){
    this.user.next(null);
    sessionStorage.clear();
    localStorage.removeItem('userData');
 //   this.cancelUser.next(true)
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
   // this.logOutclicked= true;
    // this.tokenExpirationTimer = null; 

    this.afAuth.signOut();
    this.router.navigate(['/login'])
    
  }
  
  checkSession(){
    let tempData = JSON.parse(sessionStorage.getItem('tempUser'))
    // console.log(tempData);
        if (tempData){
          let expiry = new Date();
          const {email,userId,displayName,photoURL} = tempData;
    
          const protoUser= new User(email,userId,expiry, displayName,photoURL);
          
          // console.log(protoUser)
         // console.log(this.logOutclicked);
          // if(this.logOutclicked){
          //   this.user.next(null)
          // }
          // else {this.user.next(protoUser)}
          this.user.next(protoUser)
      // return true
    }
  }

  private handleAuthentication(email:string,userId:string, expiresIn:number,displayName:string,pictureUrl: string){
   
    const expirationDate = new Date(expiresIn);
    const user = new User(
      email,
      userId,
      expirationDate,
      displayName,
      pictureUrl
    );
      if(this.rememberMe){
        localStorage.setItem('userData',JSON.stringify(user))
      };

      if(!this.rememberMe){
        this.checkSession()
      }
    //  console.log(user);
      this.user.next(user)

  }
  
  updateProfile(loginPassword:string, user: User){
   
    
  }

  // checkAuthentication(){
  //   return this.afAuth.onAuthStateChanged( (user)=>{
      
    
  //     if(user){
        
  //         console.log(user.displayName)
         
  //        return user.displayName
        
       
        
         
      
  //      // this.user=user
  //     }else {
  //       console.log('user absent');
  //       return false;
       
  //     }
  //   })
  // }


  updatePassword(loginPassword:string,user:User){
   
    
  }

   handleError(errorRes){
    //  console.log(errorRes.code)
    
    let errorMessage = 'An unknown error occurred, try again';
    if(!errorRes.code || !errorRes.message){
     return errorMessage
     
    }
    switch(errorRes.code){
      
      case 'auth/email-already-in-use':
        errorMessage = 'This email already exists';
        break;
        case 'auth/network-request-failed':
          errorMessage = 'Error in netwoerk connection';
          break;
      // case 'OPERATION_NOT_ALLOWED':
      //   errorMessage = 'Password SignUp is disabled';
      //   break;
        case 'auth/too-many-requests':
          errorMessage = 'Wrong password, pls try again after a while';
          break;
      case 'auth/user-not-found':
        errorMessage = 'Incorrect email or password';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect email or password';
        break;
      case 'INVALID_TOKEN':
        errorMessage = 'Please sign in again';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password must be 6 characters long or more';
        break;
      case 'auth/user-disabled':
        errorMessage = 'User does not exist';
      case 'auth/invalid-email':
        errorMessage = 'Email is invalid'
      
       
      
        
        
    }
    return errorMessage
  }

 
  
}
