import { Injectable } from '@angular/core';
import { Icon } from '../models/Icon';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  ELEMENT_DATA: Icon[] = [{title: 'Lat Machine', path: '../assets/images/latmachine.png'}];

  constructor() { }

  getIcons(): Icon[] {
    return <Icon[]>(this.ELEMENT_DATA);
  }
}
