import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared/services/shared.service';

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
    const meetingsList = this.sharedService.getMeetingList();
  }

  onSubmit() {
    let meetingList = JSON.parse(sessionStorage.getItem('meetingList'));
    if (meetingList && meetingList.length > 0) {
      meetingList.push(this.meetingForm.value);
    } else {
      meetingList = [];
      meetingList.push(this.meetingForm.value);
    }
    sessionStorage.setItem('meetingList', JSON.stringify(meetingList));
    this.snackBar.open('Meeting Booked Successfully',  'okay', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
    this.router.navigateByUrl('/master/list-meetings');
  }

}
