import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/models/Exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-musclelist',
  templateUrl: './exercise-musclelist.component.html',
  styleUrls: ['./exercise-musclelist.component.css']
})
export class ExerciseMusclelistComponent implements OnInit {

  exercises: Array<Exercise>;

  @Input()
  muscle: string;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExercisesByMuscleMass(this.muscle);
  }

  refreshList() {
    this.getExercisesByMuscleMass(this.muscle);
  }

  onElementDeleted($event) {
    if ($event.id !== 0) {
      this.exercises = this.exercises.filter(item => item.id === $event.id);
    }
  }

  getExercisesByMuscleMass(muscle: string) {
    this.exerciseService.getExercisesByMuscleMass(muscle).subscribe (exercises => {
      this.exercises = exercises;
    });
  }

}
