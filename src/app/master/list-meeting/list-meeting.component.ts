import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, filter } from 'rxjs/operators';
import { MeetingList, Query } from '../../shared/models/meetingList';
import { lexicographicSortSchema } from 'graphql';

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
    public sharedService: SharedService) {
  }

  ngOnInit() {
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

}
