import { Injectable } from '@angular/core';
import { Alert } from './Alert';
import { AlertType } from './AlertType';

/**
 * DO NOT FORGET TO ADD 
 * <app-alert></app-alert>
 * TO ANY HTML PAGE. PLACE THE TAG AT THE DESIRED POSITION OF YOUR HTML PAGE -  TO ENJOY ALERT
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alerts: Alert[] = [];

  constructor() {
    this.reset();
  }

  alert(alert: Alert){
    this.alerts.push(alert);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  closeAll(){
    this.alerts = [];
  }

  reset() {
    this.alerts = Array.from(this.alerts);
  }

  alertMessage(message: string, dismissible?:boolean, type?: string){
    let alertObj = {message:message, type:type, dismissible:dismissible} as Alert;
    this.alert(alertObj);
  }

  alertSuccess(message: string, dismissible?:boolean){
    let alertObj = {message:message, type:AlertType.SUCCESS, dismissible:dismissible} as Alert;
    this.alert(alertObj);
  }

  alertWarning(message: string, dismissible?:boolean){
    let alertObj = {message:message, type:AlertType.WARNING, dismissible:dismissible} as Alert;
    this.alert(alertObj);
  }

  alertDanger(message: string, dismissible?:boolean){
    let alertObj = {message:message, type:AlertType.DANGER, dismissible:dismissible} as Alert;
    this.alert(alertObj);
  }

}
