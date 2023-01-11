import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { ModalComponent } from './modal/modal.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ToastComponent } from './toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
   
   providers: [
      ModalComponent,
      ToastComponent,
      AlertComponent,
      ProgressSpinnerComponent
   ],
   
   declarations: [
      ModalComponent,
      ToastComponent,
      AlertComponent,
      ProgressSpinnerComponent
   ],
   
   exports: [
      ModalComponent,
      ToastComponent,
      AlertComponent,
      ProgressSpinnerComponent
   ],

   imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
   ]
})

export class BootstrapModule { }
