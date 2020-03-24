export type MeetingList = {
    _id: string;
    userName: string;
    meetingAgenda: string;
    meetingDate: string;
    meetingRoom: string;
    fromTime: string;
    toTime: string;
    fromDateTime: Date;
    toDateTime: Date;

}

export type Query = {
    meetings: MeetingList[];
}