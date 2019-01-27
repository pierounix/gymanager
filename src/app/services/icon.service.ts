import { Injectable } from '@angular/core';
import { Icon } from '../models/Icon';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class IconService {

  ELEMENT_DATA: Icon[] = [{id: 1, title: 'Lat Machine', path: '../assets/images/latmachine.png'}];

  constructor(private httpClient: HttpClient) { }

  getIcons(): Observable<Icon[]> {
    // return <Icon[]>(this.ELEMENT_DATA);
    return this.httpClient.get<Icon[]>(API_URL + '/icons');
  }
}
