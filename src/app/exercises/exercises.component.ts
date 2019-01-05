import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../models/Exercise';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: Array<Exercise>;

  constructor(private exerciseService: ExerciseService) {
    this.exercises = this.exerciseService.getExercises();
  }


  ngOnInit() {
  }

  getExercises(): Exercise[] {
    return this.exerciseService.getExercises();
  }

}
