import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { HttpClientModule } from '@angular/common/http';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConnectionServiceModule} from 'ngx-connection-service'; 




//import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
//import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
//import { Cloudinary } from 'cloudinary-core';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesDefaultDetailComponent } from './recipes/recipes-default-detail/recipes-default-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { HeaderComponent } from './header/header.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
//import { RecipesIngredientComponent } from './recipes/recipes-ingredient/recipes-ingredient.component';
 import { RecipesProcedureComponent } from './recipes/recipes-procedure/recipes-procedure.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { AlertComponent } from './shared/alert/alert.component';
import { SmallLoaderComponent } from './shared/small-loader/small-loader.component';
import { LikedRecipesComponent } from './liked-recipes/liked-recipes.component';
import { LikedListComponent } from './liked-recipes/liked-list/liked-list.component';
import { LikedDetailComponent } from './liked-recipes/liked-detail/liked-detail.component';
import { LikedItemComponent } from './liked-recipes/liked-list/liked-item/liked-item.component';
import { RecipeComponent } from './recipe/recipe.component';
import { SettingsComponent } from './settings/settings.component';
import { ScrollTrackerDirective } from './shared/scroll-tracker.directive';
import {InfiniteScrollComponent} from './shared/infinite-scroll/infinite-scroll.component';

//import { getLocaleDateFormat } from '@angular/common';


//import { SafePipe } from './safe.pipe';
//import { ShoppingListItemComponent } from './shopping-list/shopping-list-item/shopping-list-item.component';
//import { RecipesIngredientComponent } from './recipes/recipes-ingredient/recipes-ingredient.component';
// import { IngredientComponent } from './shared/ingredient/ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    ShoppingListComponent,
    AuthComponent,
    RecipesDetailComponent,
    RecipesDefaultDetailComponent,
    RecipesEditComponent,
    HeaderComponent,
    RecipesListComponent,
    RecipeItemComponent,
    ShoppingListEditComponent,
  // RecipesIngredientComponent,
    RecipesProcedureComponent,
  LoadingComponent,
  AlertComponent,
  SmallLoaderComponent,
  LikedRecipesComponent,
  LikedListComponent,
  LikedDetailComponent,
  LikedItemComponent,
  RecipeComponent,
  SettingsComponent,
  ScrollTrackerDirective,
  InfiniteScrollComponent
  
  //SafePipe,
   // RecipesIngredientComponent,
   // ShoppingListItemComponent,
    // IngredientComponent
  ],
  imports: [
   // IonicModule.forRoot({animated: false}),
    BrowserModule,
    //.forRoot({animated: false}),
   
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    // InfiniteScrollModule,
    ConnectionServiceModule
   // FormsModule,
    // CloudinaryModule
    //CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'your_cloud_name' } as CloudinaryConfiguration),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
