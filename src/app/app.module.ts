import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MembersComponent } from './members/members.component';
import { MemberService } from './services/member.service';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { NewExerciseComponent, NewExerciseComponentDialogComponent } from './newexercise/newexercise.component';
import { FormsModule } from '@angular/forms';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { SheetMakerComponent } from './member-detail/sheet-maker/sheet-maker.component';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    ExercisesComponent,
    ExerciseComponent,
    NewExerciseComponent,
    NewExerciseComponentDialogComponent,
    MemberDetailComponent,
    SheetMakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [NewExerciseComponentDialogComponent],
  providers: [MemberService,
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'}, ,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
