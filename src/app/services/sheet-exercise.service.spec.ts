import { TestBed } from '@angular/core/testing';

import { SheetExerciseService } from './sheet-exercise.service';

describe('SheetExerciseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SheetExerciseService = TestBed.get(SheetExerciseService);
    expect(service).toBeTruthy();
  });
});
