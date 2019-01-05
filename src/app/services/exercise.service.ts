import { Injectable } from '@angular/core';
import { Exercise } from '../models/Exercise';

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

  constructor() { }

  getExercises(): Exercise[] {
    return <Exercise[]>(this.exercises);
  }

  getExercisesByMuscleMass(muscleMass: string): Exercise[] {
    return this.exercises.filter(exercise => exercise.muscle === muscleMass);
  }

  getExerciseById(id: number): Exercise {
     return this.exercises.find(exercise => exercise.id === id);
  }
}
