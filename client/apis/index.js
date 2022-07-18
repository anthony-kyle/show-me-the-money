import request from "superagent";

import { getEncodedToken } from "authenticare/client";

const jsonHeader = { Accept: "application/json" };
let authHeader = { Authorization: `Bearer ${getEncodedToken()}` };

const setAuthHeader = () => {
  authHeader = { Authorization: `Bearer ${getEncodedToken()}` };
}

const apiUrl = "/api/v1";

//gets meeting deets by id
export function APIgetMeetingDetails(id) {
  setAuthHeader();
  return request
    .get(apiUrl + "/meetings/" + id)
    .set(jsonHeader)
    .set(authHeader)
    .then((res) => {
      return res.body;
    })
    .catch((err) => console.log(err));
}

//gets all users
export function APIgetUsers() {
  setAuthHeader();
  return request
    .get(apiUrl + "/users")
    .set(jsonHeader)
    .set(authHeader)
    .then((res) => {
      return res.body;
    })
    .catch((err) => console.log(err));
}

//post new meeting
export function APIpostMeeting(meeting) {
  setAuthHeader();
  return request.post(apiUrl + "/meetings")
  .set(jsonHeader)
  .set(authHeader)
  .send(meeting)
  .then(res => {
    return res.body
  })
  .catch(err => console.log(err))
}

// gets all past meetings by id
export function APIgetPastMeetings() {
  setAuthHeader();
  return request
    .get(apiUrl + "/meetings")
    .set(jsonHeader)
    .set(authHeader)
    .then((res) => {
      return res.body;
    })
    .catch((err) => console.log(err));
}

// Get Graph Details
export function getGraphDetails(limit) {
  setAuthHeader();
  return request
    .get(apiUrl + "/graph" + (limit ? "/" + limit : ""))
    .set(jsonHeader)
    .set(authHeader)
    .then((res) => res.body)
    .catch((err) => console.error(err.message));
}

//Update -> End Meeting
export function updateCompletedMeeting(id, meeting) {
  setAuthHeader();
  return request
    .patch(apiUrl + "/meetings/" + id)
    .set(jsonHeader)
    .set(authHeader)
    .send(meeting)
    .then((res) => {
      return res.body;
    })
    .catch((err) => console.error(err.message));
}
