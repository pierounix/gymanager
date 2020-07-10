import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Exercise } from '../models/Exercise';
import { ExerciseService } from '../services/exercise.service';
import { Icon } from '../models/Icon';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { IconService } from '../services/icon.service';
import { AlertService } from '../services/alert-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  @Input()
  exercise: Exercise;

  @Output() exerciseRemoved = new EventEmitter<number>();

  @Output() newExerciseAdded = new EventEmitter<any>();

  constructor(public dialog: MatDialog,
              private exerciseService: ExerciseService) { }

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

  openDialogEdit(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.exercise;
    dialogConfig.width = '800px';

// tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(EditExerciseComponentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}


@Component({
  selector: 'app-edit-exercise-dialog',
  templateUrl: 'editexercise-dialog.html',
  styleUrls: ['./exercise.component.css']
})
export class EditExerciseComponentDialogComponent {

  icons: Icon[];

  constructor(
    public dialogRef: MatDialogRef<EditExerciseComponentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public exercise: Exercise,
    private alertService: AlertService,
    private iconService: IconService,
    private exerciseService: ExerciseService,
    private sanitization: DomSanitizer
  ) {
    this.getIcons();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.exercise.image_path != null
      && this.exercise.title != null) {
        this.saveExercise();
        this.alertService.create('INFO', 5000, 'Esercizio modificato');
        this.dialogRef.close(this.exercise);
      }
  }

  selectImage(path: string) {
    this.exercise.image_path = path;
  }

  getIcons() {
    this.iconService.getIcons().subscribe( icons => {
      this.icons = icons;
      for (let i = 0; i < this.icons.length; i++) {
        this.icons[i].safeUrl = this.sanitization.bypassSecurityTrustUrl(this.icons[i].path);
       }
    });

  }

  saveExercise() {
    this.exerciseService.updateExercise(this.exercise).subscribe(
      data => {},
           error => {
               console.log('ERROR updating exercise', error);
           }
       );
  }

}
