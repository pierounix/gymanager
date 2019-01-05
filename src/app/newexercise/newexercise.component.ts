import { Component, OnInit, Inject, Input } from '@angular/core';
import { Exercise } from '../models/Exercise';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { IconService } from '../services/icon.service';
import { Icon } from '../models/Icon';

@Component({
  selector: 'app-newexercise',
  templateUrl: './newexercise.component.html',
  styleUrls: ['./newexercise.component.css']
})
export class NewExerciseComponent {

  newexercise: Exercise;

  @Input()
  muscleMass: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.newexercise = new Exercise();
    this.newexercise.muscle = this.muscleMass;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.newexercise;
    dialogConfig.width = '800px';

    const dialogRef = this.dialog.open(NewExerciseComponentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.newexercise = result;
      console.log(this.newexercise.title);
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
    @Inject(MAT_DIALOG_DATA) public newexercise: Exercise, private iconService: IconService
  ) {
    this.icons = this.getIcons();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.newexercise.image_path != null
      && this.newexercise.title != null) {
        this.dialogRef.close(this.newexercise);
      }
  }

  selectImage(path: string) {
    this.newexercise.image_path = path;
  }

  getIcons(): Icon[] {
    return this.iconService.getIcons();
  }
}
