import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {

    alertSettings$ = new Subject<any>();

    constructor() {
    }

    create(type: string , time: number, message: string) {
      this.alertSettings$.next({
        type,
        time,
        message
      });
    }
}
