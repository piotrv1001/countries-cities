import { HttpClient } from '@angular/common/http';
import { ChatRoom } from '../model/chat-room';
import { SERVER_ADDRESS, SERVER_PORT } from './../app.constants';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {

  GET_CHAT_ROOMS_URL = `${SERVER_ADDRESS}:${SERVER_PORT}/chat-rooms`;
  CREATE_CHAT_ROOM_URL = `${SERVER_ADDRESS}:${SERVER_PORT}/create-chat-room`;

  constructor(private http: HttpClient) {}

  getChatRooms(): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(this.GET_CHAT_ROOMS_URL);
  }

  createChatRoom(chatRoom: ChatRoom): Observable<void> {
    return this.http.post<void>(this.CREATE_CHAT_ROOM_URL, chatRoom);
  }

}
