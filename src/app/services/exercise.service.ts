import { Injectable } from '@angular/core';
import { Exercise } from '../models/Exercise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exer: Exercise;
  exercises: Exercise[] = [
    // tslint:disable-next-line:max-line-length
    {id: 1, title: 'Lat machine', description: 'Portare la sbarra dietro la testa', muscle: 'Dorsali', image_path: '../assets/images/latmachine.png'},
    // tslint:disable-next-line:max-line-length
    {id: 2, title: 'Pectoral machine', description: 'Spingere in avanti', muscle: 'Pettorali', image_path: '../assets/images/latmachine.png'},
    // tslint:disable-next-line:max-line-length
    {id: 3, title: 'Pectoral machine', description: 'Spingere in avanti', muscle: 'Pettorali', image_path: '../assets/images/latmachine.png'}
  ];

  constructor(private httpClient: HttpClient) { }

  getExercises(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(API_URL + '/exercises');
  }

  getExercisesByMuscleMass(muscleMass: string): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(API_URL + '/exercises/muscle/' + muscleMass);
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.httpClient.get<Exercise>(API_URL + '/exercises/' + id);
  }

  addExercise(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.post<Exercise>(API_URL + '/exercises/', exercise, httpOptions);
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.put<Exercise>(API_URL + '/exercises/', exercise);
  }

  removeExercise(id: number): Observable<Exercise> {
    return this.httpClient.delete<Exercise>(API_URL + '/exercises/' + id);
  }
}
