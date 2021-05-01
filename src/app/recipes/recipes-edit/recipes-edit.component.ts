import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormGroup, FormControl,Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../recipe.model';
import { RecipeService} from '../recipe.service';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {AlertService} from '../../shared/alert/alert.service';


@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss']
})

export class RecipesEditComponent implements OnInit,OnDestroy {
  recipe: Recipe;
  recipeForm: FormGroup;
  disableAdd: Boolean;
  editMode:Boolean;
  index:string;
  editSub: Subscription;
  addRecipeLoading: boolean= false;
 //
// httpClient: any;
  selectedFile: File;
  response: any;
  file: File;
  image: string = '../../../assets/icons/image.svg'; 
  

  // private initForm(){

   
  //   let vidUrls = new FormArray([]);
  //   let ingredients = new FormArray([]);

  //   //console.log(this.recipe)
    

     
  //     // //console.log(this.recipe);
  //     // //console.log(this.editMode);

  //   if(this.editMode){ 
  //   let  vidUrls = new FormArray([]);
  //   let ingredients = new FormArray([]); 
  //     if(this.recipe.ingredients){
        
  //       for(let ingredient of this.recipe.ingredients){
  //       //  //console.log(ingredient);
  //        // //console.log(ingredient.symbol);
  //         ingredients.push(
  //           new FormGroup({
  //             'name': new FormControl(ingredient.name,[Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/)]),
  //             'quantity': new FormControl(ingredient.quantity,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] ),
  //             'symbol': new FormControl(ingredient.symbol, Validators.required)
  //           })
  //         );
          
  //       }
  //     }
  //     //console.log(ingredients)

  //     if(this.recipe.vidUrls){
        
  //       for(let recipeVidUrl of this.recipe.vidUrls){
  //       //  //console.log(recipeVidUrl);
  //         vidUrls.push(
  //           new FormGroup({
  //             'vidUrl': new FormControl(`${recipeVidUrl}`,Validators.required),
  //             //'amount': new FormControl(ingredient.amount)
  //           })
  //         );
          
          
  //       }
  //       //console.log(vidUrls);
  //       this.disableAdd = this.recipe.vidUrls.length >= 3 ? true: false
  //     }

  //     this.recipeForm = new FormGroup({
        
  //       'name': new FormControl(this.recipe.name, Validators.required),
  //       'description': new FormControl(this.recipe.description, Validators.required),
  //       'instruction': new FormControl(this.recipe.instruction, Validators.required),
  //       'imgUrl': new FormControl(this.recipe.imgUrl, Validators.required),
  //       'vidUrls': vidUrls,
  //       'ingredients': ingredients
  //     })

  //   }else{
  //    // //console.log('zagadat');
  //   //   vidUrls.push(
  //   //     new FormGroup({
  //   //       'vidUrl': new FormControl( null, Validators.required)
  //   //     })
  //   //   );
  //   //  // //console.log(vidUrls)
        
  //   //       ingredients.push(
  //   //         new FormGroup({
  //   //           'name':new FormControl(null, Validators.required),
  //   //           'quantity': new FormControl(null, Validators.required ),
  //   //           'symbol': new FormControl("kg", Validators.required)
  //   //         })
  //   //       )
        
      

  //   //   this.recipeForm = new FormGroup({
  //   //     'name': new FormControl(null, Validators.required),
  //   //     'description': new FormControl(null, Validators.required),
  //   //     'instruction': new FormControl(null, Validators.required),
  //   //     'imgUrl': new FormControl(null, Validators.required),
  //   //     'vidUrls': vidUrls,
  //   //     'ingredients': ingredients
  
  //   //   })
  
  //   }
    

  // }
  

 

  constructor( private router: Router, private route: ActivatedRoute, private recipeService:RecipeService, private httpClient: HttpClient,private alertService: AlertService) { }

  ngOnInit() {

   
    this.index = this.route.snapshot.params['id'];
    this.editMode = this.route.snapshot.params['id'] != null;
   // //console.log(this.editMode);
   // //console.log(this.index)
   

    this.route.params.subscribe((params: Params)=>{
      this.index = params['id'];
     // //console.log(this.index)
      
     
    });
    

    
    this.editSub = this.recipeService.editMode.subscribe((editmode:boolean)=>{
      
      this.editMode = editmode;
      
    });
    
    
    if(this.editMode){
      this.recipeService.getRecipe(this.index).subscribe(recipe => {
        this.recipe = recipe;
     //   //console.log(this.recipe);
        this.image= this.recipe.imgUrl
         
      let  vidUrls = new FormArray([]);
      let ingredients = new FormArray([]); 
        if(this.recipe.ingredients){
          
          for(let ingredient of this.recipe.ingredients){
          //  //console.log(ingredient);
           // //console.log(ingredient.symbol);
            ingredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name,[Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/)]),
                'quantity': new FormControl(ingredient.quantity,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] ),
                'symbol': new FormControl(ingredient.symbol, Validators.required)
              })
            );
            
          }
        }
      //  //console.log(ingredients)
  
        if(this.recipe.vidUrls){
          
          for(let recipeVidUrl of this.recipe.vidUrls){
          //  //console.log(recipeVidUrl);
            vidUrls.push(
              new FormGroup({
                'vidUrl': new FormControl(`${recipeVidUrl.vidUrl}`,Validators.required),
                //'amount': new FormControl(ingredient.amount)
              })
            );
            
            
          }
       //   //console.log(vidUrls);
          this.disableAdd = this.recipe.vidUrls.length >= 3 ? true: false
        }
  
        this.recipeForm = new FormGroup({
          
          'name': new FormControl(this.recipe.name, Validators.required),
          'description': new FormControl(this.recipe.description, Validators.required),
          'instruction': new FormControl(this.recipe.instruction, Validators.required),
          'imgUrl': new FormControl(this.image, Validators.required),
          'vidUrls': vidUrls,
          'ingredients': ingredients
        })
        //this.initForm()
      });
    }
    // else{
    //   let vidUrls = new FormArray([]);
    //   let ingredients = new FormArray([]);
    //   vidUrls.push(
    //     new FormGroup({
    //       'vidUrl': new FormControl( null, Validators.required)
    //     })
    //   );
    //  // //console.log(vidUrls)
        
    //       ingredients.push(
    //         new FormGroup({
    //           'name':new FormControl(null, Validators.required),
    //           'quantity': new FormControl(null, Validators.required ),
    //           'symbol': new FormControl("kg", Validators.required)
    //         })
    //       )
        
      

    //   this.recipeForm = new FormGroup({
    //     'name': new FormControl(null, Validators.required),
    //     'description': new FormControl(null, Validators.required),
    //     'instruction': new FormControl(null, Validators.required),
    //     'imgUrl': new FormControl(null, Validators.required),
    //     'vidUrls': vidUrls,
    //     'ingredients': ingredients
  
    //   })

    // }
    let vidUrls = new FormArray([]);
      let ingredients = new FormArray([]);
      this.image='../../../assets/icons/image.svg';
      vidUrls.push(
        new FormGroup({
          'vidUrl': new FormControl( null, Validators.required)
        })
      );
     // //console.log(vidUrls)
        
          ingredients.push(
            new FormGroup({
              'name':new FormControl(null, Validators.required),
              'quantity': new FormControl(null, Validators.required ),
              'symbol': new FormControl("kg", Validators.required)
            })
          )
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'instruction': new FormControl(null, Validators.required),
      'imgUrl': new FormControl(this.image, Validators.required),
      'vidUrls': vidUrls,
      'ingredients': ingredients

    })

    
    
    
  }

 


  
  get ingredientsCt(){
    
    return this.recipeForm.get('ingredients') as FormArray ;
    
  }
  get vidUrlsCt(){
    return this.recipeForm.get('vidUrls') as FormArray;
  }


  async onSubmitRecipe(){
    this.addRecipeLoading= true;
    //console.log(this.recipeForm.value)
    const recipe = this.recipeForm.value
    if(this.editMode){
    
      
      this.recipeService.updateRecipe(recipe, this.index);
     const ali =  this.recipeService.updateIndex(this.index,recipe);
    //console.log(ali);
    this.recipeService.recipesHasChanged.next(this.recipeForm.value)
    }else{
      await this.onUploadImg().then(()=>{
       
        let returned = this.recipeService.addRecipe(this.recipeForm.value);
        this.recipeService.updateIndex(this.index,recipe);
        if(returned != null){
          this.addRecipeLoading= false
        }
      }
      );
      ;
    }; 
    
   // //console.log(this.recipesForm.value);
    this.router.navigate(['../'], {relativeTo: this.route})
  }




  onDeleteIng(id:number){
    const ing = this.recipeForm.get('ingredients') as FormArray;
    ing.removeAt(id)
   
  }
  onDeleteUrl(id:number){
    const vid = this.recipeForm.get('vidUrls') as FormArray;
    vid.removeAt(id);
    this.disableAdd = vid.length >= 3 ? true: false;
  }
  onCancel(){
    this.recipeService.collapseDetail.next(true);
    this.recipeService.isShrunk.next(false);
    this.router.navigate(['../'], {relativeTo: this.route})
  }
  onAddNewVidUrl(){
    const newForm = this.recipeForm.get('vidUrls') as FormArray;
   
    newForm.push( 
      new FormGroup({
      "vidUrl": new FormControl(null,Validators.required)
    })
    )
    this.disableAdd = newForm.length >= 3 ? true: false;  
   // //console.log(newForm.length);
  }
  
  onAddNewIng(){
    const newIng= this.recipeForm.get('ingredients') as FormArray;
    
    newIng.push(
      new FormGroup({
        'name':new FormControl(null, Validators.required),
        'quantity': new FormControl(null, Validators.required ),
        'symbol': new FormControl('kg', Validators.required)
      })
    )
  }

  addImage(event){

    this.file = (event.target as HTMLInputElement).files[0];
    //console.log(this.file);
   let ext= this.file.name.split('.')[1];
  let name = this.file.name.split('.')[0];
 // //console.log(this.file.name.split('.'))
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
//  //console.log(this.selectedFile);

 }

  onUploadImg(){
    const formData = new FormData();
    // const bool= true;
     
   
 // //console.log(this.selectedFile);
   formData.append('file', this.selectedFile);
   formData.append('upload_preset', environment.CLOUDINARY_UPLOAD_PRESET);
   formData.append('folder', 'recipeApp/users');

   return new Promise((resolve, reject) => {
    this.httpClient.post("https://api.cloudinary.com/v1_1/dkxbadex/image/upload", formData)
    .subscribe(res => {
      if(res) {
        resolve(res);
        //console.log(res);
        this.response = res;
        //  //console.log(res);
        //  //console.log(typeof(this.response.url)) 
          this.recipeForm.patchValue({
            'imgUrl': this.response.url
          }) 
          
          
          
     
         
        //return this.response.url
      }
     // //console.log(this.uploadProgress);
   

      
      
      
     
      // alert('Uploaded Successfully.');
    },(err)=>{
      //console.log(err);
      this.alertService.alert.next(true);
      this.alertService.message.next("Somthing went wrong, make  sure image is uploaded");
      this.addRecipeLoading= false;
    
    })
  
  })
  }
      ngOnDestroy(){
        this.editSub.unsubscribe()
      }
      
}
