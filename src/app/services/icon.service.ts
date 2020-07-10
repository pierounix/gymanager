import { Injectable } from '@angular/core';
import { Icon } from '../models/Icon';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private httpClient: HttpClient) { }

  getIcons(): Observable<Icon[]> {
    // return <Icon[]>(this.ELEMENT_DATA);
    return this.httpClient.get<Icon[]>(API_URL + '/icons');
  }

  getIconByTitle(title: string): Observable<Icon> {
    // return <Icon[]>(this.ELEMENT_DATA);
    return this.httpClient.get<Icon>(API_URL + '/icons/' + title);
  }

  addIcon(icon: Icon): Observable<Icon> {
    return this.httpClient.post<Icon>(API_URL + '/icons/', icon, httpOptions);
  }

  uploadImage(image: File): Observable<any[]> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post<any[]>(API_URL + '/public/images/', formData);
  }
}
