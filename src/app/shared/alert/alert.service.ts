import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  message= new BehaviorSubject<string>(null);
  alert = new Subject<boolean>();
  constructor() { }
}
