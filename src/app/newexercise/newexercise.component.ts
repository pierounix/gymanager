import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../models/Exercise';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { IconService } from '../services/icon.service';
import { Icon } from '../models/Icon';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-newexercise',
  templateUrl: './newexercise.component.html',
  styleUrls: ['./newexercise.component.css']
})
export class NewExerciseComponent {

  newexercise: Exercise;

  @Output() newExerciseAdded = new EventEmitter<any>();

  @Input()
  muscleMass: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.newexercise = new Exercise();
    this.newexercise.muscle = this.muscleMass;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.newexercise;
    dialogConfig.width = '800px';

// tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(NewExerciseComponentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.newexercise = result;
      this.newExerciseAdded.emit();
    });
  }
}



@Component({
  selector: 'app-newexercise-edialog',
  templateUrl: 'newexercise-dialog.html',
  styleUrls: ['./newexercise.component.css']
})
export class NewExerciseComponentDialogComponent {

  icons: Icon[];

  constructor(
    public dialogRef: MatDialogRef<NewExerciseComponentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newexercise: Exercise, private iconService: IconService,
    private exerciseService: ExerciseService
  ) {
    this.getIcons();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.newexercise.image_path != null
      && this.newexercise.title != null) {
        this.saveExercise();
        this.dialogRef.close(this.newexercise);
      }
  }

  selectImage(path: string) {
    this.newexercise.image_path = path;
  }

  getIcons() {
    this.iconService.getIcons().subscribe( icons => {
      this.icons = icons;
    });
  }

  saveExercise() {
    this.exerciseService.addExercise(this.newexercise).subscribe(
      data => {},
           error => {
               console.log('ERROR updating exercise', error);
           }
       );
  }

}
