import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'meeting-room';

  public roomsList = [];

  ngOnInit() {
    this.roomsList = [];
    for (let i = 1; i <= 10; i++) {
      const room = {
        roomName: 'Room ' + i,
        roomDescription: 'Capacity for ' + (i + 2) + ' members'
      };
      this.roomsList.push(room);
    }
    sessionStorage.setItem('roomsList', JSON.stringify(this.roomsList));
  }
}
