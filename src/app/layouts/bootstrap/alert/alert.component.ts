import { Component, Input } from '@angular/core';
import { Alert } from './Alert';
import { AlertService } from './AlertService';
// import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
   // add NgbAlertConfig  to the component providers: Global configuration of alerts 
  // providers: [NgbAlertConfig]
})
export class AlertComponent {

  // @Input() public alerts: Array<string> = [];

  // constructor(alertConfig: NgbAlertConfig) { 
  //    //  Global configuration of alerts
  //   // customize default values of alerts used by this component tree
  //   alertConfig.type = 'success';
  //   alertConfig.dismissible = true;
  // }

  constructor(public alertService: AlertService){
    
  }

}
