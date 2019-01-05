import { Injectable } from '@angular/core';
import { Member } from '../models/Member';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {


  members: Member[] = [
    // tslint:disable-next-line:max-line-length
    {id: 1, first_name: 'Piero', last_name: 'Uniti', date_of_birth: new Date(), address: 'via Starza, Sant\'Agata De\'Goti,SNC', status: 'Attivo', sheet: 'SI'},
    // tslint:disable-next-line:max-line-length
    {id: 2, first_name: 'Sara', last_name: 'Abbatiello', date_of_birth: new Date(), address: 'c.da Traugnano, Sant\'Agata De\'Goti,6', status: 'Scaduto', sheet: 'NO'},
  ];

  constructor() { }

  getMembers(): Observable<Member[]> {
    return of <Member[]>(this.members);
  }

  getMember(id: number): Member {
    return this.members.find(member => member.id === id);
  }

}
