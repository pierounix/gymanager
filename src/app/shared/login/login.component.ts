import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  showSpinner: boolean;
  errorMessage: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.showSpinner = false;
  }

  login(): void {

    this.errorMessage = null;
    localStorage.removeItem('currentUser');

    if (this.email  && this.password ) {

    this.showSpinner = true;
    this.authenticationService.login(this.email, this.password)
        .pipe(first())
        .subscribe(
            data => {
                // this.router.navigate(['\\']);
                this.showSpinner = false;
                this.router.navigate(['/', 'members']);
            },
            error => {
                if ((typeof error.error) === 'string') {
                  this.errorMessage = error.error;
                } else {
                  this.errorMessage = 'Server error';
                }
                this.showSpinner = false;
            });
          } else {

            this.errorMessage = 'Inserire credenziali';
          }
  }



}
