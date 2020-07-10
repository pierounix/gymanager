import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { LoginComponent } from './shared/login/login.component';
import { IconUploaderComponent } from './icon-uploader/icon-uploader.component';

const routes: Routes = [
  {path: '', component: MembersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'members', component: MembersComponent},
  {path: 'exercises', component: ExercisesComponent},
  {path: 'members/:idmember', component: MemberDetailComponent},
  {path: 'iconupload', component: IconUploaderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
