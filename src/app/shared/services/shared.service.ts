import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getRoomsList() {
    if (JSON.parse(sessionStorage.getItem('roomsList'))) {
      return JSON.parse(sessionStorage.getItem('roomsList'));
    } else {
      return [];
    }
  }

  getMeetingList() {
    if (JSON.parse(sessionStorage.getItem('meetingList'))) {
      return JSON.parse(sessionStorage.getItem('meetingList'));
    } else {
      return [];
    }
  }
}
