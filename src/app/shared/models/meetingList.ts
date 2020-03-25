export type MeetingList = {
    _id: string;
    userName: string;
    meetingAgenda: string;
    meetingDate: string;
    meetingRoom: string;
    fromTime: string;
    toTime: string;
    fromDateTime: string;
    toDateTime: string;

}

export type Query = {
    meetings: MeetingList[]; 
    getmeetingsbytime: MeetingList[]; 
}