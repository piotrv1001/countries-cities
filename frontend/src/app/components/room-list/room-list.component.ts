import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ChatRoom } from "src/app/model/chat-room";
import { ChatRoomService } from "src/app/services/chat-room.service";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { SERVER_ADDRESS, SERVER_PORT } from "src/app/app.constants";
import { JoinRoomEvent } from "../room/room.component";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {

  chatRooms: ChatRoom[] = [];
  getChatRoomsSub?: Subscription;
  socket$?: WebSocketSubject<any>;
  currentUsername?: string;
  usernameArray: string[] = [];
  webSocketSub?: Subscription;

  constructor(
    public router: Router,
    private chatRoomService: ChatRoomService
  ) {}

  ngOnInit(): void {
    this.getChatRooms();
  }

  ngOnDestroy(): void {
    this.getChatRoomsSub?.unsubscribe();
    this.socket$?.complete();
    this.webSocketSub?.unsubscribe();
  }

  handleJoinRoomEvent(event: JoinRoomEvent): void {
    const { roomName, password } = event;
    const chatRoom = this.chatRooms.find(room => room.name === roomName);
    if(chatRoom && chatRoom.password === password) {
      this.connectToChatRoom(chatRoom.name);
    }
  }

  handleCreateRoom(newRoom: ChatRoom): void {
    this.chatRoomService.createChatRoom(newRoom).subscribe({
      next: (name) => {
        console.log('name', name);
        this.chatRooms.push(newRoom);
      },
      error: err => console.log('Error: ', err)
    })
  }

  private getChatRooms(): void {
    this.getChatRoomsSub = this.chatRoomService.getChatRooms().subscribe(chatRooms => this.chatRooms = chatRooms);
  }

  private connectToChatRoom(roomName: string): void {
    this.socket$ = webSocket(`ws://${SERVER_ADDRESS}:${SERVER_PORT}/${roomName}`);
    this.webSocketSub = this.socket$.subscribe(
      {
        next: userArray => {
          this.usernameArray = userArray.users;
        },
        error: err => console.log('Web socket error: ', err),
        complete: () => console.log('Complete')
       }
    );
    if(this.currentUsername != null) {
      this.socket$?.next(this.currentUsername);
    }
  }

}
