import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent implements OnInit {

  @Input() isLoading: boolean = true;
  @Input() isButton: boolean = false;
  @Input() spinnerGrow: boolean = false;
  @Input() classes: string = "text-primary";

  constructor() {
  }

  ngOnInit() {
    if (this.spinnerGrow) {
      this.classes = "spinner-grow " + this.classes;
    }
  }

}
