import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingLayoutComponent } from './meeting-layout/meeting-layout.component';
import { LayoutComponent } from '../app-common/layout/layout.component';
import { ListMeetingComponent } from './list-meeting/list-meeting.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListMeetingComponent
      },
      {
        path: 'book-meeting',
        component: CreateMeetingComponent
      },
      {
        path: 'list-meetings',
        component: ListMeetingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
