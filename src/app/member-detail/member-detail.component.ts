import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../models/Member';
import { MemberService } from '../services/member.service';
import { SheetService } from '../services/sheet.service';
import { Sheet } from '../models/Sheet';
import { SheetExercise } from '../models/SheetExercise';
import { SheetExerciseService } from '../services/sheet-exercise.service';

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
  days: Array<String>;

  constructor(private memberService: MemberService,
    private sheetService: SheetService,
    private sheetExerciseService: SheetExerciseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.member = this.memberService.getMember(+params.idmember);
       }
    );
    this.days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];
    this.sheet = this.sheetService.getSheetByMemeberId(this.member.id);
    this.isSheetUpdated = false;
    this.sheetExercises = this.getSheetExercises();
  }

  returnToMembers() {
    this.router.navigate(['members']);
  }

  receiveUpdateEvent($event) {
    const dayToUpdate = $event['dd'];
    const sheetExercisesUpdated = $event['se'];
    const filteredArray  = this.sheetExercises.filter(e => e.day === dayToUpdate);
    filteredArray.forEach(f => this.sheetExercises.splice(this.sheetExercises.findIndex(e => e.day === f.day), 1));
    sheetExercisesUpdated.forEach(f => this.sheetExercises.push(f));
    this.isSheetUpdated = true;
  }

  copySheetDay($event) {
    const dayFromUpdate = $event['fromdd'];
    const dayToUpdate = $event['todd'];

    this.sheetExercises.forEach((f, index) => {
      if (f.day === dayToUpdate) {
        this.sheetExercises.splice(index, 1);
      }
    });

    const seList = new Array<SheetExercise>();
    let numEx = 1;
    for (let i = 0; i < this.sheetExercises.length; i++) {
      if (this.sheetExercises[i].day = dayFromUpdate) {
        const se = new SheetExercise();
        se.day = dayToUpdate;
        se.exercise_mode = this.sheetExercises[i].exercise_mode;
        se.exercise_muscle = this.sheetExercises[i].exercise_muscle;
        se.exercise_title = this.sheetExercises[i].exercise_title;
        se.note = this.sheetExercises[i].note;
        se.num_exercise = numEx++;
        seList.push(se);
      }
  }
  seList.forEach(f => this.sheetExercises.push(f));

  }

  saveSheet() {
    console.log('Save');
    this.isSheetUpdated = false;
  }

  private getSheetExercises(): Array<SheetExercise> {
    return this.sheetExerciseService.getSheetExercises(this.sheet.id);
  }

  getSheetExercisesByDay(day: string):  Array<SheetExercise> {
    return this.sheetExercises.filter(sheetExercise => sheetExercise.day === day);
  }

}
