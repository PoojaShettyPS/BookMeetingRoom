import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { ListMeetingComponent } from './list-meeting/list-meeting.component';
import { MeetingLayoutComponent } from './meeting-layout/meeting-layout.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    CreateMeetingComponent,
    ListMeetingComponent, 
    MeetingLayoutComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    SharedModule,
    MaterialModule
  ],
  entryComponents: [ ConfirmDialogComponent ]
})
export class MasterModule { }
