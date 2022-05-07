import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
//import { Subscription } from 'rxjs';
import {User} from '../../shared/models/user.model';
import {DataService} from '../../shared/data.service';
import {FormGroup, FormControl,Validators } from '@angular/forms';
import {RecipeService } from '../../recipes/recipe.service';
import { Observable, of, Subject } from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router';
import {SettingsService} from '././../../components/settings/settings.service';
import{AngularFireAuth} from '@angular/fire/auth';

//import { forkJoin } from 'rxjs';
import {map,switchMap, filter, mergeMap} from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import {Recipe} from '../../recipes/recipe.model';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 // @ViewChild('input',{static:true}) inputkey : ElementRef;
 //optionsVisible: boolean= false;
settingsClicked: boolean;
cancelUser: boolean;
key: string;
user:User;
displayPicture: string;
userName:string;
isAuthenticated:boolean = false;
index:number;
searchForm:FormGroup;
clickedProfile:boolean = false;
suggestions: Recipe[];
showSuggestions:boolean = false;
noResult:boolean=false;
searchterm = new Subject<string>();

 

public recipesCollection :Observable<any[]>;
// recipesCollection: AngularFirestoreCollection<Recipe>;

  names: any;

//userName:String;
  constructor( private authService: AuthService,
      private settingsService: SettingsService,
      private dataService: DataService,
      private firestore: AngularFirestore,
      private router:Router,
      private route:ActivatedRoute,
      private afAuth:AngularFireAuth ) { 
   // this.data = db.collection('').valueChanges();
    this.recipesCollection = this.firestore.collection( 'Recipes').valueChanges()
  }

  ngOnInit() {
    

        
        this.authService.user.subscribe((user)=>{
         
       //   console.log(user)
          this.isAuthenticated = !!user;
          this.user = {...user};
         // console.log(this.user)
          // console.log(this.user.photoURL.split("upload/"));
          // console.log(arr);
          //console.log('i am  2 working')
          
          if(!user){
             this.authService.checkSession();
            //  let arr = this.user.photoURL.split("upload/");
            //  console.log(arr);
          }
  
        
          
          
        
        
        
       
  
  
  
        
        
  
         
          
         
          
        })
     // }
      
      
    

      this.settingsService.settingsClicked.subscribe(value=>{
        this.settingsClicked = value;
       // console.log(this.settingsClicked)
      })

      this.search().subscribe((value:Recipe[])=>{
      // console.log(value)
        
          
          this.suggestions = value;
          if(this.suggestions.length == 0){
            this.showSuggestions = false;
            return this.noResult= true;
          }
        // console.log(this.suggestions)
        this.noResult = false;
        this.showSuggestions = true;
        // console.log(true)
        });
          //   this.foundSuggestions = true
          
          //  console.log(this.suggestions);
        ;
      
      //   console.log(this.afAuth.onAuthStateChanged)
      // this.afAuth.onAuthStateChanged( (user)=>{
      //   let self = this;
      //  // console.log(that);
      //   if(user){
          
      //       console.log(user.displayName)
          
      //     // this.userName= user.displayName
      //     // console.log(user.displayName);
      //     this.isAuthenticated= true;
      //      console.log(this.isAuthenticated);
           
        
      //    // this.user=user
      //   }else {
      //     console.log('user absent')
      //     // User is signed out.
      //     // ...
      //   }
      // })

      

        
      



        



      this.searchForm = new FormGroup(
        {
          'searched': new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/)])
        }
      )
  }



  


  onSubmitSearch(){
    let recipeResult;
      this.dataService.searchRecipe(this.searchForm.value.searched).subscribe((value)=>{
        recipeResult = value;
      //  console.log(recipeResult)
      //  console.log(recipeResult[0].name);
        
        if(recipeResult.length != 0){
          let name= recipeResult[0].name;
         name = name.replace(' ','-')
          this.router.navigateByUrl(`recipe/${name}`)
        //  this.router.navigate(['recipe/name'])
          this.dataService.searchResult.next(recipeResult[0])
        }
        this.searchForm.reset()
      });
    
    
    
  }

 
  // optionsClicked(){
  //   this.optionsVisible= !this.optionsVisible
  // }
  

  searchInput(input:HTMLInputElement){
    let input1:string;

    this.searchForm.valueChanges.subscribe(value=>{
    //  console.log(this.searchForm.value.searched)
     if( !this.searchForm.value.searched.match((/^\s*$/))){
      input1= value.searched;
      
      this.searchterm.next(input1)
       
     }else{
       this.showSuggestions= false;
       this.noResult=false;
      
     }
    // input1= value.searched.trim()
    // this.searchterm.next(input1)
      
    })
    
    
   
    
  //  this.searchterm.next($event.target.value.toLowerCase());
  //   let q = $event.target.value;
  //   this.startAt.next(q);
  //   this.endAt.next(q + "\uf8ff");
  //  console.log(this.startAt.subscribe())
    
  }
  










  search(){


    

  
   // console.log(this.searchterm);
    
    
    
   return  this.searchterm.pipe(
      filter(val => !!val),
      switchMap(searchterm =>{
        
     //  console.log(searchterm.length);
     //  console.log(searchterm)
        
        
        
       return this.firestore.collection('Recipes',ref => ref.limit(4).orderBy(`searchableIndex.${searchterm}`)).valueChanges();
        
       
      })
      // map(value=>{
      //   console.log(value)
      //   return this.firestore.collection('Recipes',ref => ref.limit(4).orderBy(`searchableIndex.${value}`)).valueChanges();
        
         
      // })
      
      //switchMap(searchterm =>{
        
      //  console.log(searchterm.length);
      //  console.log(searchterm)
        
        
        
       // return this.firestore.collection('Recipes',ref => ref.limit(4).orderBy(`searchableIndex.${searchterm}`)).valueChanges();
        
       
      //})
      
      
    )
    
    // .subscribe(value=>{
    //   this.firestore.collection('Recipes',ref => ref.limit(4).orderBy(`searchableIndex.${value}`)).valueChanges();
    // })

    

   
    
    
}

// firequery(start:string, end:string){
//   return this.firestore.collection('Recipes', ref => ref.limit(5).orderBy('name_lowercase').startAt(start).endAt(end)).valueChanges();
// };

  
  onClickProfile(){
    this.clickedProfile= !this.clickedProfile;
   
   
  }
  

  onClickLogout(){
    this.clickedProfile =  false;
    this.authService.logout();
   // this.user= null;
    this.isAuthenticated= false;
  //  this.authService.user.next(null)

  }

  onClickSettings(){
    this.settingsClicked = true;

    console.log("click click click")
    this.router.navigate(['/settings'])
   // this.settingsService.settingsClicked.next(this.settingsClicked)
  }
  onSelectSuggestion(el){
    
    this.searchForm= new FormGroup(
      {
        'searched': new FormControl(el.name,[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/)])
      }

    )
    this.showSuggestions=false
    
    // this.searchForm= new FormGroup(
    //   {
    //     'searched': new FormControl(this.suggestions[this.index],[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/)])
    //   }
    // )
    // this.searchForm.value = this.suggestions[this.index]
  }
}

