import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

const routes: Routes = [
  {path: '', component: MembersComponent},
  {path: 'members', component: MembersComponent},
  {path: 'exercises', component: ExercisesComponent},
  {path: 'members/:idmember', component: MemberDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
