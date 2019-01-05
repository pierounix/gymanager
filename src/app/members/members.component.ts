import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Member } from '../models/Member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private memberService: MemberService, private router: Router) { }

  displayedColumns = ['first_name', 'last_name', 'date_of_birth', 'sheet', 'status', 'details'];

  memberDataSource = new MemberDataSource(this.memberService);

  ngOnInit() {
  }

  onSelectMember(member: Member) {
    this.router.navigate(['members', member.id]);

  }

}

export class MemberDataSource extends DataSource<any> {
  constructor(private memberService: MemberService) {
    super();
  }

  connect(): Observable<Member[]> {
    return this.memberService.getMembers();
  }

  disconnect() {
  }
}
