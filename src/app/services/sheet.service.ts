import { Injectable } from '@angular/core';
import { Sheet } from '../models/Sheet';

@Injectable({
  providedIn: 'root'
})
export class SheetService {


  sheets: Sheet[] = [
    {id: 1, id_member: 1, start_date: new Date(), end_date: new Date(), sheet_name: 'Massa'},
    {id: 2, id_member: 2, start_date: new Date(), end_date: new Date(), sheet_name: 'Tonificazione'},
  ];

  constructor() { }

  getSheet(id_member: number): Sheet {
    return this.sheets.find(sheet => sheet.id_member === id_member);
  }

  getSheetByMemeberId(id_member: number): Sheet {
    return this.sheets.find(sheet => sheet.id_member === id_member);
  }
}
