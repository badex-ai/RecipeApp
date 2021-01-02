import { Component, OnInit } from '@angular/core';
import {AlertService} from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  message: string;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.message.subscribe(message=>{
      this.message = message;
      console.log(message)
    })
  }

}
