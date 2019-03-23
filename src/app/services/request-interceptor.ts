
import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';


@Injectable()

export class RequestInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.authenticationService.currentUserValue;

    // Verify if user is logged in
    if (currentUser && currentUser.token) {
           request = request.clone({
               setHeaders: {access_token: `${currentUser.token}`}
           });
         } else {
        this.router.navigate(['/', 'login']);
      }

    return next.handle(request).do((event: HttpEvent<any>) => { }, (err: any) => {
      if (err) {
        // auto logout if 401 response returned from api
        }
      });




    }
}
