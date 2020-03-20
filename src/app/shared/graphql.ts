import gql from 'graphql-tag';
export const CREATE_MEETING_MUTATION = gql`
  mutation createMeeting($userName: String!, $meetingRoom: String!, $meetingDate: String!, $fromTime: String!, $toTime: String!, $meetingAgenda: String) {
    createMeeting(userName : $userName, meetingRoom : $meetingRoom, meetingDate : $meetingDate, fromTime : $fromTime, toTime :$toTime, meetingAgenda : $meetingAgenda) 
  }
`;

//3
export interface CreateMeetingMutationResponse {
 // createMeeting: Link;
  loading: boolean;
}
