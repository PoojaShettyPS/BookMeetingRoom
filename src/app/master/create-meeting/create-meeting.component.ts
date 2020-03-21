import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as moment from 'moment';
import { Apollo } from 'apollo-angular';
import { CREATE_MEETING_MUTATION } from '../../shared/graphql';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})

export class CreateMeetingComponent implements OnInit {

  public meetingForm: FormGroup;
  public roomsList = [];

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public apollo: Apollo,
    public sharedService: SharedService,
    private snackBar: MatSnackBar) {
    this.meetingForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      meetingRoom: ['', [Validators.required]],
      meetingDate: ['', [Validators.required]],
      fromTime: ['', [Validators.required]],
      toTime: ['', [Validators.required]],
      meetingAgenda: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.roomsList = this.sharedService.getRoomsList();
  }

  onOpen() {
    console.log('on open');
  }

  onSubmit() {
    const meetingDate = moment(this.meetingForm.value.meetingDate).format('YYYY-MM-DD');
    const fromMomentObj = moment(meetingDate + this.meetingForm.value.fromTime, 'YYYY-MM-DDLT');
    const fromDateTimeString = fromMomentObj.format();

    const toMomentObj = moment(meetingDate + this.meetingForm.value.toTime, 'YYYY-MM-DDLT');
    const toDateTimeString = toMomentObj.format();

    let meetingList = JSON.parse(sessionStorage.getItem('meetingList'));
    console.log(moment(this.meetingForm.value.meetingDate + ' ' + this.meetingForm.value.fromTime));
    if (meetingList && meetingList.length > 0) {
      meetingList.push(this.meetingForm.value);
      this.apollo.mutate({
        mutation: CREATE_MEETING_MUTATION,
        variables: {
          userName: this.meetingForm.value.userName,
          meetingRoom: this.meetingForm.value.meetingRoom,
          meetingDate: this.meetingForm.value.meetingDate,
          fromTime: this.meetingForm.value.fromTime,
          toTime: this.meetingForm.value.toTime,
          fromDateTime: fromDateTimeString,
          toDateTime: toDateTimeString,
          meetingAgenda: this.meetingForm.value.meetingAgenda,
        }
      }).subscribe((response) => {
        console.log('response', response);
      }, (error) => {
        console.log('error', error);
      });
    } else {
      meetingList = [];
      meetingList.push(this.meetingForm.value);
    }
    sessionStorage.setItem('meetingList', JSON.stringify(meetingList));
    this.snackBar.open('Meeting Booked Successfully', 'okay', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
    this.router.navigateByUrl('/master/list-meetings');
  }

}
