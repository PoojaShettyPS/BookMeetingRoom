export type MeetingList = {
    _id: string;
    userName: string;
    fromTime: string;
    toTime: string;
}

export type Query = {
    meetings: MeetingList[];
}