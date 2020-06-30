import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Member } from '../models/Member';
import { Router } from '@angular/router';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize, map } from 'rxjs/operators';
import { SheetService } from '../services/sheet.service';
import { SheetExerciseService } from '../services/sheet-exercise.service';
import { AlertService } from '../services/alert-service.service';

export class MemberDataSource extends DataSource<any> {

  private memberSubject = new BehaviorSubject<Member[]>([]);

  constructor(private memberService: MemberService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Member[]> {
    return this.memberSubject.asObservable();
  }

  loadMembers(filter: string)  {
    if (filter.length <= 2) {
      this.memberService.getMembers().subscribe(
        members => this.memberSubject.next(members)
      );
    } else {
        this.memberService.getMembersBySearch(filter).subscribe(
          members => this.memberSubject.next(members)
        );
      }
    }


  disconnect(collectionViewer: CollectionViewer): void {
    this.memberSubject.complete();
  }
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {

  constructor(private memberService: MemberService,
    private router: Router,
    private alertService: AlertService) { }

  displayedColumns = ['first_name', 'last_name', 'date_of_birth', 'sheet', 'status', 'details'];

  memberDataSource: MemberDataSource;

  ngOnInit() {
    this.memberDataSource = new MemberDataSource(this.memberService);
    this.memberDataSource.loadMembers('');
  }

  onSelectMember(member: Member) {
    this.router.navigate(['members', member.id]);
  }

  onDeleteMember(member: Member) {

    const currentUser: Member = JSON.parse(localStorage.getItem('currentUser'));
    if (member.id === currentUser.id) {
      this.alertService.create('INFO', 5000, 'Impossibile cancellare utente corrente');
    } else {
      this.memberService.deleteMember(member.id).subscribe(
        data => {
          this.memberDataSource.loadMembers('');
        },
             error => {
                 console.log('ERROR updating exercise', error);
                 this.memberDataSource.loadMembers('');
             }
         );
    }


  }

public doFilter = (search: string) => {
      this.memberDataSource.loadMembers(search);
  }

}
