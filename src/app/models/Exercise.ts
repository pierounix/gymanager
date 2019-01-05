import { ExerciseInterface } from './ExerciseInterface';

export class Exercise implements ExerciseInterface {
  id: number;
  title: string;
  description?: string;
  muscle: string;
  image_path?: string;

  constructor() {}
}
