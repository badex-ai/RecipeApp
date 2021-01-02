import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settingsClicked = new Subject<boolean>();
  usersCollection: AngularFirestoreCollection<any>;
     
      constructor(private authService: AuthService,private firestore: AngularFirestore ) 
  { 
    this.usersCollection = this.firestore.collection('Users')
  }
  public getUser(id:string){
   return this.usersCollection.doc(id).valueChanges()
  }
}
