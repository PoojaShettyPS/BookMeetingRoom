import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.scss']
})
export class ListMeetingComponent implements OnInit {

  public roomsList = [];
  public meetingsList = [];
  public roomClicked = false;

  constructor(
    public router: Router,
    public sharedService: SharedService) {
  }

  ngOnInit() {
    this.roomsList = this.sharedService.getRoomsList();
  }

  viewBookings(roomName) {
    const meetingsList = this.sharedService.getMeetingList();
    this.meetingsList = meetingsList.filter(x => x.meetingRoom === roomName);
    this.roomClicked = true;
    console.log(this.meetingsList);
  }

  goBack() {
    this.roomClicked = false;
  }

  bookMeeting() {
    this.router.navigateByUrl('/master/book-meeting');
  }

}
