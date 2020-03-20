import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as moment from 'moment';
import { Apollo } from 'apollo-angular';
import { CREATE_MEETING_MUTATION, CreateMeetingMutationResponse } from '../../shared/graphql';
import gql from 'graphql-tag';
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
    const meetingsList = this.sharedService.getMeetingList();
  }

  onSubmit() {
    let meetingList = JSON.parse(sessionStorage.getItem('meetingList'));
    if (meetingList && meetingList.length > 0) {
      meetingList.push(this.meetingForm.value);
      console.log(this.meetingForm.value.meetingDate);
      var dateObj = new Date(this.meetingForm.value.meetingDate);
      var b = dateObj.toISOString();
     var date = new Date(b);
var finaldate = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
var dtfrom = moment(this.meetingForm.value.fromTime, ["h:mm A"]).format("HH:mm:ss");
var dtto = moment(this.meetingForm.value.toTime, ["h:mm A"]).format("HH:mm:ss");
var example1 = moment(finaldate + " " + dtfrom ).format("YYYY-MM-DD[T]HH:mm:ss");
var example2 = moment(finaldate + " " + dtto ).format("YYYY-MM-DD[T]HH:mm:ss");
example1 = example1 + ".000Z";
example2 = example2 + ".000Z";
console.log(this.meetingForm.value.meetingDate);
console.log(finaldate);
console.log(example1, example2);

this.apollo.mutate({
  mutation: CREATE_MEETING_MUTATION,
  variables: {    
    userName: this.meetingForm.value.userName,
    meetingRoom: this.meetingForm.value.meetingRoom,
    meetingDate: this.meetingForm.value.meetingDate,
    fromTime: example1,
    toTime: example2,
    meetingAgenda: this.meetingForm.value.meetingAgenda,
  }
}).subscribe((response) => {
    console.log("response", response);
    
},(error)=>{
  console.log("error",error);
  
});


    } else {
      meetingList = [];
      meetingList.push(this.meetingForm.value);
    }
    sessionStorage.setItem('meetingList', JSON.stringify(meetingList));
    this.snackBar.open('Meeting Booked Successfully',  'okay', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
    this.router.navigateByUrl('/master/list-meetings');
  }


}
