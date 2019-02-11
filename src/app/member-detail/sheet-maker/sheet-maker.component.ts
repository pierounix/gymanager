import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from 'src/app/models/Exercise';
import { Sheet } from 'src/app/models/Sheet';
import { SheetExercise } from 'src/app/models/SheetExercise';
import { ExerciseService } from 'src/app/services/exercise.service';
import { SheetExerciseService } from 'src/app/services/sheet-exercise.service';
import { IfStmt } from '@angular/compiler';

let uniqueId = 0;

@Component({
  selector: 'app-sheet-maker',
  templateUrl: './sheet-maker.component.html',
  styleUrls: ['./sheet-maker.component.css']
})
export class SheetMakerComponent implements OnInit {

  muscleMasses: Array<String>;
  selectedMuscle: string;
  exercises: Array<Exercise>;
  selectedExercise: Exercise;

  sheetExercise: SheetExercise;
  dayToCopyFrom: string;
  uid = uniqueId++;

  @Output() updateSheetEvent = new EventEmitter<any>();

  @Output() copySheetEvent = new EventEmitter<any>();

  @Input()
  sheetExercises: Array<SheetExercise>;

  @Input()
  sheet: Sheet;

  @Input()
  day: string;

  constructor(private exerciseService: ExerciseService,
    private sheetExerciseService: SheetExerciseService) {
   }

  ngOnInit() {
    this.onSelectDay();
  }

  onSelectDay() {
    this.selectedExercise = new Exercise();
    this.sheetExercise = new SheetExercise();
    this.sheetExercise.day = this.day;
    this.muscleMasses = ['Addominali', 'Dorsali', 'Spalle', 'Pettorali', 'Bicipiti', 'Tricipiti', 'Gambe'];
  }

  removeExercise(num_exercise: number) {
    this.sheetExercises.forEach( (item) => {
    });
    const index = this.sheetExercises.findIndex (ind => ind.num_exercise === num_exercise);
    if (index !== -1) {
      for (let i = index; i < this.sheetExercises.length; i++) {
        this.sheetExercises[i].num_exercise--;
      }
      this.sheetExercises.splice(index, 1);
      this.updateSheetEvent.emit({se: this.sheetExercises, dd: this.day});
    }
  }

  moveExerciseUp(num_exercise: number) {
    const index = this.sheetExercises.findIndex (ind => ind.num_exercise === num_exercise);
    if (index !== -1 && index !== 0) {
      this.sheetExercises.splice(index - 1, 0, this.sheetExercises[index]);
      this.sheetExercises.splice(index + 1, 1);
      this.sheetExercises[index - 1].num_exercise --;
      this.sheetExercises[index].num_exercise ++;
      this.updateSheetEvent.emit({se: this.sheetExercises, dd: this.day});
    }
  }

  moveExerciseDown(num_exercise: number) {
    const index = this.sheetExercises.findIndex (ind => ind.num_exercise === num_exercise);
    if (index !== -1 && index !== this.sheetExercises.length - 1) {
      this.sheetExercises.splice(index + 2, 0, this.sheetExercises[index]);
      this.sheetExercises.splice(index, 1);
      this.sheetExercises[index + 1].num_exercise ++;
      this.sheetExercises[index].num_exercise --;
      this.updateSheetEvent.emit({se: this.sheetExercises, dd: this.day});
    }
  }

  private getExercisesByMuscleMass(muscleMass: string) {
    this.selectedExercise = new Exercise();
    this.sheetExercise = new SheetExercise();
    this.exerciseService.getExercisesByMuscleMass(muscleMass).subscribe(exercises => {
      this.exercises = exercises;
    });
  }

  private onSelectExercise(id_exercise: number) {
    this.exerciseService.getExerciseById(+id_exercise).subscribe(exercise => {
      this.selectedExercise = exercise;
    });
  }

  onAddExercise() {
    this.sheetExercise.exercise_title = this.selectedExercise.title;
    this.sheetExercise.exercise_muscle = this.selectedExercise.muscle;
    this.sheetExercise.day = this.day;
    if (this.sheetExercises.length > 0) {
      this.sheetExercise.num_exercise = Math.max.apply(Math, this.sheetExercises.map(function(o) { return o.num_exercise + 1; }));
    } else {
      this.sheetExercise.num_exercise = 1;
    }
    if (this.sheetExercise.exercise_title != null &&
      this.sheetExercise.exercise_mode != null &&
      this.sheetExercise.exercise_muscle != null ) {
    this.sheetExercises.push(this.sheetExercise);
    this.updateSheetEvent.emit({se: this.sheetExercises, dd: this.day});
    }
    this.sheetExercise = new SheetExercise();
  }

  copyDay(dayToCopyFrom: string) {
    this.copySheetEvent.emit({fromdd: dayToCopyFrom, todd: this.day});
  }

}
