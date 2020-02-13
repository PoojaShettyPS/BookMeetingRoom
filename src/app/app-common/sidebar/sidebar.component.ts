import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuList = [
    { menuName: 'List Meetings', menuLink: '/master/list-meetings' },
    { menuName: 'Book Meeting', menuLink: '/master/book-meeting' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
