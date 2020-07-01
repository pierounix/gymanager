import { Injectable } from '@angular/core';
import { Sheet } from '../models/Sheet';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const API_URL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SheetService {


  sheets: Sheet[] = [
    {id: 1, id_member: 1, start_date: new Date(), end_date: new Date(), sheet_name: 'Massa'},
    {id: 2, id_member: 2, start_date: new Date(), end_date: new Date(), sheet_name: 'Tonificazione'},
  ];

  constructor(private httpClient: HttpClient) { }

  getSheetByMemberId(id_member: number): Observable<Sheet> {
    // return this.sheets.find(sheet => sheet.id_member === id_member);
    return this.httpClient.get<Sheet>(API_URL + '/sheets/member/' + id_member);
  }

  updateSheet(sheet: Sheet) {
    const url = API_URL + '/sheets/';
    return this.httpClient.put(url, sheet, httpOptions).subscribe(
       data => {},
            error => {
                console.log('ERROR updating sheet', error);
            }
        );
  }

  addSheet(sheet: Sheet) {
    const url = API_URL + '/sheets/';
    return this.httpClient.post(url, sheet, httpOptions).subscribe(
      data => {},
           error => {
               console.log('ERROR inserting sheet', error);
           }
       );
  }

  deleteSheet(id: number): Observable<Sheet> {
    return this.httpClient.delete<Sheet>(API_URL + '/sheets/' + id);
  }


}
