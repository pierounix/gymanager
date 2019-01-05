import { Injectable } from '@angular/core';
import { SheetExercise } from '../models/SheetExercise';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetExerciseService {

  sheetExercises: SheetExercise[] = [
    {id: 1, exercise_muscle: 'Dorsali', exercise_title: 'Lat machine', id_sheet: 1, day: 'Lunedì', num_exercise: 1, exercise_mode: '4x3'},
    // tslint:disable-next-line:max-line-length
    {id: 2, exercise_muscle: 'Pettorali', exercise_title: 'Pectoral machine', id_sheet: 1, day: 'Lunedì', num_exercise: 2, exercise_mode: '3x10'},
  ];


  constructor() { }


  getSheetExercises(): SheetExercise[] {
    return this.sheetExercises;
  }

  getSheetExercisesByDay(id_sheet: number, day: string): Array<SheetExercise> {
    return this.sheetExercises.filter(sheetExercise => sheetExercise.day === day);
  }

}
