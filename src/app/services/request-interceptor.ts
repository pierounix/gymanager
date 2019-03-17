
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


@Injectable()

export class RequestInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => { }, (err: any) => {
      if (err) {
        // auto logout if 401 response returned from api
        console.log('ERRORE API');
        }
     const currentUser = this.authenticationService.currentUserValue;
     if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {Authorization: `access_token ${currentUser.token}`}
            });
          }
      });
    }
}
