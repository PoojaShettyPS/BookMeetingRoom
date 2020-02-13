import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingLayoutComponent } from './meeting-layout.component';

describe('MeetingLayoutComponent', () => {
  let component: MeetingLayoutComponent;
  let fixture: ComponentFixture<MeetingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
