import { api, handleResponse, handleError } from "../../services/api.service";

// export const loginUser = (data) =>
//   api()
//     .post(`/user/auth/register`, data)
//     .then(handleResponse)
//     .catch(handleError);

export const registerUser = (data) =>
  api()
    .post(`/user/auth/register`, data)
    .then(handleResponse)
    .catch(handleError);

export const userProfile = (token) =>
  api(token).get("/user/auth/profile").then(handleResponse).catch(handleError);

export const getAllRooms = (token) =>
  api(token).get("/user/chat/rooms").then(handleResponse).catch(handleError);

export const getRoom = (token,roomId) => 
  api(token).get(`/user/chat/room/${roomId}`).then(handleResponse).catch(handleError);

export const getAllMessage = (token,room) =>
  api(token).get(`user/chat/messages?roomId=${room}`).then(handleResponse).catch(handleError)


export const getChatList = (token,id) =>
  api(token).get(`user/chat/chatList/${id}`).then(handleResponse).catch(handleError)

export const deleteList =  (token,body) =>
  api(token).post('user/chat/deleteUser',body).then(handleResponse).catch(handleError)