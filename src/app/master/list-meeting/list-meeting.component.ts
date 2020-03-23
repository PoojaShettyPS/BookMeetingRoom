import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { MeetingList, Query } from '../../shared/models/meetingList';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.scss']
})
export class ListMeetingComponent implements OnInit {

  public roomsList = [];
  public meetingsList = [];
  public meetings: Observable<MeetingList[]>;

  constructor(
    public router: Router,
    private apollo: Apollo,
    public sharedService: SharedService) {
  }

  ngOnInit() {
    this.roomsList = this.sharedService.getRoomsList();
    this.viewBookings();
  }

  viewBookings() {
   this.apollo.watchQuery<Query>({
      query: gql`query
      {
        meetings {
          _id 
          userName
          fromTime
          toTime
        }
      }`
    }).valueChanges.pipe(map(result => result.data.meetings)).subscribe((res) =>{
      this.meetingsList = res;
      console.log(res);
    });
    console.log('Meetings--->', this.meetingsList);
  }

  bookMeeting() {
    this.router.navigateByUrl('/master/book-meeting');
  }

}
