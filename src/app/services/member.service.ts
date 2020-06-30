import { Injectable, ɵConsole } from '@angular/core';
import { Member } from '../models/Member';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const API_URL = environment.apiURL;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MemberService {


  constructor(private httpClient: HttpClient) { }

  getMembers(): Observable<Member[]> {
    // return of <Member[]>(this.members);
    return this.httpClient.get<Member[]>(API_URL + '/members');
  }

  getMembersBySearch(search: string): Observable<Member[]> {
    // return of <Member[]>(this.members);
    return this.httpClient.get<Member[]>(API_URL + '/members/search/' + search);
  }

  getMember(id: number): Observable<Member> {
    // return this.members.find(member => member.id === id);
    const url = API_URL + '/members/' + id;
    return this.httpClient.get<Member>(url);
  }

  updateMember(member: Member) {
    const url = API_URL + '/members/' + member.id;

    return this.httpClient.put(url, member, httpOptions).subscribe(
       data => {},
            error => {
                console.log('ERROR updating member', error);
            }
        );
  }

  deleteMember(id: number): Observable<Member> {
    return this.httpClient.delete<Member>(API_URL + '/members/' + id);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
