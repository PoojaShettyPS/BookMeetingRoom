import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog/confirm-dialog.component';
import * as moment from 'moment';
import { Apollo } from 'apollo-angular';
import { CREATE_MEETING_MUTATION, QUERY_GET_MEETING } from '../../shared/graphql';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { MeetingList, Query } from '../../shared/models/meetingList';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from "@angular/material";
import { AutofillMonitor } from '@angular/cdk/text-field';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})

export class CreateMeetingComponent implements OnInit {

  public meetingForm: FormGroup;
  public roomsList = [];
  public meetingsList = [];
  public today;
  public getmeetingsbytime: Observable<MeetingList[]>;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public apollo: Apollo,
    private dialog: MatDialog,
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

  get toTime(): any { return this.meetingForm.get('toTime'); }

  ngOnInit() {
    this.openDialog();
    this.today = new Date();
    this.roomsList = this.sharedService.getRoomsList();
    this.meetingForm.controls.toTime.valueChanges.subscribe((res) => {
      if (this.meetingForm.value.meetingDate === '') {
        this.snackBar.open('Please select meeting date', 'okay', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.meetingForm.get('toTime').patchValue('', { emitEvent: false });
      } else if (this.meetingForm.value.fromTime === '') {
        this.snackBar.open('Please select from time', 'okay', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.meetingForm.get('toTime').patchValue('', { emitEvent: false });
      }
      else {

      }
    });

    this.meetingForm.controls.meetingAgenda.valueChanges.subscribe((res) => {
      if (this.meetingForm.value.toTime === '') {
        this.snackBar.open('Please select Meeting To Time', 'okay', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.meetingForm.get('meetingAgenda').patchValue('', { emitEvent: false });
      } else {
        const meetingDate = moment(this.meetingForm.value.meetingDate).format('YYYY-MM-DD');
        const fromMomentObj = moment(meetingDate + this.meetingForm.value.fromTime, 'YYYY-MM-DDLT');
        var fromDateTime = fromMomentObj.format();

        const toMomentObj = moment(meetingDate + this.meetingForm.value.toTime, 'YYYY-MM-DDLT');
        var toDateTime = toMomentObj.format();
        console.log(this.meetingForm.value.fromTime);
        console.log(this.meetingForm.value.toTime);




        this.apollo.watchQuery<Query>({
          query: gql`query($fromDateTime: String!, $toDateTime : String)
              {
                getmeetingsbytime(
                 
                  fromDateTime: $fromDateTime, toDateTime: $toDateTime 
                  
                 ) {
                  _id 
                  userName
                  meetingRoom
                  meetingDate
                  meetingAgenda
                  fromTime
                  toTime
                  fromDateTime
                  toDateTime
                }
              }`,
          variables: {
            fromDateTime: fromDateTime,
            toDateTime: toDateTime
          }
        }).valueChanges.pipe(map(result => result.data.getmeetingsbytime)).subscribe((res) => {
          console.log(res);

          this.meetingsList = res;
          this.meetingsList.filter(val => {
            this.roomsList.filter(eachRoom => {
              if (eachRoom.roomName === val.meetingRoom) {
                eachRoom["status"] = "booked";
                console.log(this.roomsList);
              }
              else {
                eachRoom["status"] = "available";
              }
            })

          })
          console.log(this.roomsList);
        });

        var dateobj = new Date();
        var toDateObj = new Date();
        toDateObj.setMinutes(toDateObj.getMinutes() + 30);
        fromDateTime = dateobj.toISOString();
        toDateTime = toDateObj.toISOString();
        console.log(fromDateTime);
        console.log(toDateTime);
        this.apollo.watchQuery<Query>({
          query: gql`query($fromDateTime: String!, $toDateTime : String)
              {
                getmeetingsbytime(
                 
                  fromDateTime: $fromDateTime, toDateTime: $toDateTime 
                  
                 ) {
                  _id 
                  userName
                  meetingRoom
                  meetingDate
                  meetingAgenda
                  fromTime
                  toTime
                  fromDateTime
                  toDateTime
                }
              }`,
          variables: {
            fromDateTime: fromDateTime,
            toDateTime: toDateTime
          }
        }).valueChanges.pipe(map(result => result.data.getmeetingsbytime)).subscribe((res) => {
          console.log(res);

          this.meetingsList = res;
          this.meetingsList.filter(val => {
            this.roomsList.filter(eachRoom => {
              if (eachRoom.roomName === val.meetingRoom) {
                eachRoom["status"] = "In use";
                console.log(this.roomsList);
              }
              else {
                // eachRoom["status"] = "available";
              }
            })

          })
          console.log(this.roomsList);
        });

      }
    });

    this.meetingForm.controls.meetingRoom.valueChanges.subscribe((res) => {
      if (this.meetingForm.value.meetingAgenda === '') {
        this.snackBar.open('Please select Meeting Agenda', 'okay', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.meetingForm.get('meetingRoom').patchValue('', { emitEvent: false });
      } else {
        console.log("value", this.meetingForm.value.fromTime);
        console.log(this.meetingForm.value.meetingRoom);
        
      }
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-modalbox',
      // data: {name: "this.name", animal: "this.anima"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  onSubmit() {
    if(this.meetingForm.valid){
      var Isvalid = true;
      console.log(this.roomsList);
      this.roomsList.filter(val =>{
        if(val.status === "booked"){
          if(val.roomName === this.meetingForm.value.meetingRoom){
              Isvalid = false;
          }
        }
      })
      if(Isvalid){
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
      } else{
        this.snackBar.open('This Meeting room is already booked. Please select other meeting room', 'okay', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      }
      
    } else {  
      this.snackBar.open('Please Enter all the details', 'okay', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
    }
  }

}
