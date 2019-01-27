import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../models/Exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  @Input()
  exercise: Exercise;

  @Output() exerciseRemoved = new EventEmitter<number>();

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  editExercise() {

  }

  removeExercise(id: number) {
    this.exerciseService.removeExercise(id).subscribe(
      data => {},
           error => {
               console.log('ERROR updating exercise', error);
               this.exerciseRemoved.emit(0);
           }
       );
    this.exerciseRemoved.emit(id);
  }

}
