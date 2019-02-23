import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {


   modalStatus: boolean;


   type: string;
   time: number;
   message: string;

  constructor(private alertService: AlertService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.alertService.alertSettings$.subscribe(
      (data) => {
       this.type = data.type;
       this.time = data.time;
       this.message = data.message;
       if (this.type !== 'ERRORE') {
        this.type = '';
       }
       this.snackBar.open(this.message, this.type, {
        duration: this.time,
      });



      }
      );
  }



}
