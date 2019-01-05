import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../models/Member';
import { MemberService } from '../services/member.service';
import { SheetService } from '../services/sheet.service';
import { Sheet } from '../models/Sheet';
import { SheetExercise } from '../models/SheetExercise';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  tab_background = 'primary';
  member: Member;
  sheet: Sheet;
  sheetExercises: Array<SheetExercise>;
  isSheetUpdated: boolean;

  constructor(private memberService: MemberService,
    private sheetService: SheetService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.member = this.memberService.getMember(+params.idmember);
       }
    );
    this.sheet = this.sheetService.getSheetByMemeberId(this.member.id);
    this.isSheetUpdated = false;
  }

  returnToMembers() {
    this.router.navigate(['members']);
  }

  receiveUpdateEvent($event) {
    this.sheetExercises = $event;
    this.isSheetUpdated = true;
  }

  saveSheet() {
    console.log('Save');
    this.isSheetUpdated = false;
  }

}
