import { SheetExerciseInterface } from './SheetExerciseInterface';

export class SheetExercise implements SheetExerciseInterface {
  id: number;
  exercise_title: string;
  exercise_muscle: string;
  id_sheet: number;
  day: string;
  num_exercise: number;
  exercise_mode: string;
  note?: string;

  constructor() {}

}
