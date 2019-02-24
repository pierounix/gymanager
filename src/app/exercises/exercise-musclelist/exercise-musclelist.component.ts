import { Component, OnInit, Input, Inject } from '@angular/core';
import { Exercise } from 'src/app/models/Exercise';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AlertService } from 'src/app/services/alert-service.service';

@Component({
  selector: 'app-exercise-musclelist',
  templateUrl: './exercise-musclelist.component.html',
  styleUrls: ['./exercise-musclelist.component.css']
})
export class ExerciseMusclelistComponent implements OnInit {

  exercises: Array<Exercise>;

  @Input()
  muscle: string;

  constructor(private exerciseService: ExerciseService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.getExercisesByMuscleMass(this.muscle);
  }

  refreshList() {
    this.getExercisesByMuscleMass(this.muscle);
  }

  onElementDeleted($event) {

    const index = this.exercises.findIndex( ex => ex.id === $event );
    this.exercises.splice(index, 1);
    this.alertService.create('INFO', 5000, 'Esercizio rimosso');
  }

  getExercisesByMuscleMass(muscle: string) {
    this.exerciseService.getExercisesByMuscleMass(muscle).subscribe (exercises => {
      this.exercises = exercises;
    });
  }

}

