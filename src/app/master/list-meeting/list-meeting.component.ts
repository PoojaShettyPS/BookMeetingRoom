import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, filter } from 'rxjs/operators';
import { MeetingList, Query } from '../../shared/models/meetingList';
import { lexicographicSortSchema } from 'graphql';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from "@angular/material";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.scss']
})
export class ListMeetingComponent implements OnInit {

  public roomsList = [];
  public meetingsList = [];
  public meetings: Observable<MeetingList[]>;
  public roomClicked = false;
  roomName: string = '';

  constructor(
    public router: Router,
    private apollo: Apollo,
    private dialog: MatDialog,
    public sharedService: SharedService) {
  }

  ngOnInit() {
    // this.openDialog();  
    this.roomsList = this.sharedService.getRoomsList();
    // this.viewBookings();
  }

  viewBookings(roomName) {
    console.log(roomName);
    this.roomName = roomName;
    this.roomClicked = true;
    this.apollo.watchQuery<Query>({
      query: gql`query($roomName: String!)
      {
        meetings(
          filter: {
            roomName: $roomName
          } 
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
        roomName: roomName
      }
    }).valueChanges.pipe(map(result => result.data.meetings)).subscribe((res) => {
      this.meetingsList = res;
      console.log(this.meetingsList);
      
    });
  }

  goBack() {
    this.roomClicked = false;
  }

  bookMeeting() {
    this.router.navigateByUrl('/master/book-meeting');
  }

  openDialog(_id){
    console.log(_id);
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-modalbox',
      // data: {name: "this.name", animal: "this.anima"}
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result){
     this.apollo.mutate({
       mutation : gql`
       mutation deleteMeeting($_id: String) {
        deleteMeeting(_id : $_id) 
       }
     `,  variables:{
       _id : _id
     }
     }).subscribe((response) => {
      console.log('response', response);
      this.viewBookings(this.roomName);
    }, (error) => {
      console.log('error', error);
    });
  }
    });
  
  }

}
