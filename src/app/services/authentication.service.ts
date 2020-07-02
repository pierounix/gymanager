import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '../models/Member';
import { environment } from 'src/environments/environment';


const API_URL = environment.apiURL;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Member>;
    public currentUser: Observable<Member>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Member>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Member {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(API_URL + '/login/admin', { email, password })
            .pipe(map(res => {
                // login successful if there's a jwt token in the response
                if (res && res.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    const member = res.user;
                    member.token = res.access_token;
                    localStorage.setItem('currentUser', JSON.stringify(member));
                    this.currentUserSubject.next(member);
                }

                return res;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
