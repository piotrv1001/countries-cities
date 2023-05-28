import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatRoom } from 'src/app/model/chat-room';

export type JoinRoomEvent = { roomName: string, password: string };

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

  @Input() chatRoom?: ChatRoom;
  @Output() joinRoomBtnClick: EventEmitter<JoinRoomEvent> = new EventEmitter<JoinRoomEvent>();
  password?: string;

  onRoomBtnClick(roomName?: string): void {
    if(roomName !== undefined && this.password !== undefined) {
      this.joinRoomBtnClick.emit({ roomName, password: this.password });
    }
  }

}
