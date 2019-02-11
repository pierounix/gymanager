import { Injectable, ɵConsole } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SheetExercise } from '../models/SheetExercise';

const API_URL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SheetExerciseService {

  sheetExercises: SheetExercise[] = [
    {id: 1, exercise_muscle: 'Dorsali', exercise_title: 'Lat machine', id_sheet: 1, day: 'Lunedì', num_exercise: 1, exercise_mode: '4x3'},
    // tslint:disable-next-line:max-line-length
    {id: 2, exercise_muscle: 'Pettorali', exercise_title: 'Pectoral machine', id_sheet: 1, day: 'Lunedì', num_exercise: 2, exercise_mode: '3x10'},
    // tslint:disable-next-line:max-line-length
    {id: 3, exercise_muscle: 'Pettorali', exercise_title: 'Pectoral machine', id_sheet: 1, day: 'Martedì', num_exercise: 1, exercise_mode: '4x10'},
  ];


  constructor(private httpClient: HttpClient) { }


  getSheetExercises(id_sheet: number): Observable<SheetExercise[]> {
    // return this.sheetExercises;
    return this.httpClient.get<SheetExercise[]>(API_URL + '/sheetexercises/' + id_sheet);
  }

  getSheetExercisesByDay(id_sheet: number, day: string): Observable<SheetExercise[]> {
    // return this.sheetExercises.filter(sheetExercise => sheetExercise.day === day);
    return this.httpClient.get<SheetExercise[]>(API_URL + '/sheetexercises/' + id_sheet + '/' + day);
  }

  uploadSheetExercises(sheetExercises: SheetExercise[]) {
    return this.httpClient.post<SheetExercise[]>(API_URL + '/sheetexercises/', sheetExercises, httpOptions);
  }

}
