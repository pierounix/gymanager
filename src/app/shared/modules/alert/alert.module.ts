import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertService } from 'src/app/services/alert-service.service';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertComponent],
  providers: [AlertService]
})
export class AlertModule { }
