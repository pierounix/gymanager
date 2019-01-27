import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseMusclelistComponent } from './exercise-musclelist.component';

describe('ExerciseMusclelistComponent', () => {
  let component: ExerciseMusclelistComponent;
  let fixture: ComponentFixture<ExerciseMusclelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseMusclelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseMusclelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
