import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../models/Member';
import { MemberService } from '../services/member.service';
import { SheetService } from '../services/sheet.service';
import { Sheet } from '../models/Sheet';
import { SheetExercise } from '../models/SheetExercise';
import { SheetExerciseService } from '../services/sheet-exercise.service';
import { NgForm, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  tab_background = 'primary';
  member: Member;
  sheet: Sheet;
  sheetExercises: SheetExercise[];
  isSheetUpdated: boolean;
  days: Array<String>;


  constructor(private memberService: MemberService,
    private sheetService: SheetService,
    private sheetExerciseService: SheetExerciseService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.sheet = new Sheet();
    this.sheetExercises = [];
    this.member = new Member();
    this.route.params.subscribe(
      (params) => {
        this.memberService.getMember(+params.idmember).subscribe (member => {
          this.member = member;
          this.sheetService.getSheetByMemberId(this.member.id).subscribe (sheet => {
            this.sheet = sheet;
            if (sheet == null ) {
              this.sheet = new Sheet();
            } else {
              this.sheetExerciseService.getSheetExercises(this.sheet.id).subscribe (sheetExercises => {
                this.sheetExercises = sheetExercises;
              });
            }
          });
        });
       }
    );
    this.days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];
    this.isSheetUpdated = false;

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

    // Clear the target day
    const sheetExerciseList = this.sheetExercises.filter(function(exer) {
      return exer.day !== dayToUpdate;
    });
    this.sheetExercises = sheetExerciseList;

    // Copy all exercises of the fromDay to a new list
    const seList = new Array<SheetExercise>();
    let numEx = 1;
    for (let i = 0; i < this.sheetExercises.length; i++) {
      if (this.sheetExercises[i].day === dayFromUpdate) {
        const se = new SheetExercise();
        se.day = dayToUpdate;
        se.exercise_mode = this.sheetExercises[i].exercise_mode;
        se.exercise_muscle = this.sheetExercises[i].exercise_muscle;
        se.exercise_title = this.sheetExercises[i].exercise_title;
        se.note = this.sheetExercises[i].note;
        se.num_exercise = numEx++;
        se.id_sheet = this.sheet.id;
        seList.push(se);
      }
  }
  seList.forEach(f => this.sheetExercises.push(f));
  this.isSheetUpdated = true;

  }

  saveSheet() {
    // In case the sheet is not yet created
    if (this.sheet.id == null) {
      this.sheet.id_member = this.member.id;
      if(this.sheet.sheet_name == null || this.sheet.sheet_name === '') {
        this.sheet.sheet_name = 'Allenamento';
      }
      this.sheetService.addSheet(this.sheet);
      this.sheetService.getSheetByMemberId(this.member.id).subscribe (sheet => {
        this.sheet = sheet;
        if (sheet == null ) {
          this.alertService.create('ERROR', 5000, 'Errore server');
        } else {

          this.sheetExercises.forEach(se => se.id_sheet = sheet.id);

          this.sheetExerciseService.removeSheetExercises(this.sheet.id).subscribe(
            data => {
              this.sheetExerciseService.uploadSheetExercises(this.sheetExercises).subscribe(
                data1 => {},
                     error => {
                         console.log('ERROR updating exercises', error);
                     }
                 );
            },
            error => {
                console.log('ERROR updating exercises', error);
            }
          );
          this.alertService.create('INFO', 5000, 'Scheda salvata');
        }
      });

    // In case the Sheet is already created
    } else {
      this.sheetExerciseService.removeSheetExercises(this.sheet.id).subscribe(
        data => {
          this.sheetExerciseService.uploadSheetExercises(this.sheetExercises).subscribe(
            data1 => {},
                 error => {
                     console.log('ERROR updating exercises', error);
                 }
             );
        },
        error => {
            console.log('ERROR updating exercises', error);
        }
      );
      this.alertService.create('INFO', 5000, 'Scheda salvata');
    }



    this.isSheetUpdated = false;
  }

  saveMember(memberform: NgForm) {
    if (memberform.controls.date_of_birth.dirty) {
      const _bdate = new Date();
      _bdate.setFullYear(this.member.date_of_birth['_i']['year']);
      _bdate.setMonth(this.member.date_of_birth['_i']['month']);
      _bdate.setDate(this.member.date_of_birth['_i']['date']);
      this.member.date_of_birth = _bdate;
    }
    if (memberform.controls.expiry_date.dirty) {
    const _edate = new Date();
    _edate.setFullYear(this.member.expiry_date['_i']['year']);
    _edate.setMonth(this.member.expiry_date['_i']['month']);
    _edate.setDate(this.member.expiry_date['_i']['date']);
    this.member.expiry_date = _edate;
    }
    this.memberService.updateMember(this.member);
    if (this.sheet.id != null) {
      if(this.sheet.sheet_name == null || this.sheet.sheet_name === '') {
        this.sheet.sheet_name = 'Allenamento';
      }
      this.sheetService.updateSheet(this.sheet);
    } else {
      this.sheet.id_member = this.member.id;
      this.sheetService.addSheet(this.sheet);
    }

    this._markFormPristine(memberform);
    this.alertService.create('INFO', 5000, 'Informazioni aggiornate');
  }

  getSheetExercisesByDay(day: string):  Array<SheetExercise> {
    console.log(this.sheetExercises);
    return this.sheetExercises.filter(sheetExercise => sheetExercise.day === day);
  }

  private _markFormPristine(form: FormGroup | NgForm): void {
    Object.keys(form.controls).forEach(control => {
        form.controls[control].markAsPristine();
    });
}

}
