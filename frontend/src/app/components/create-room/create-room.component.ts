import { Component, Output, EventEmitter } from "@angular/core";
import { ChatRoom } from "src/app/model/chat-room";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent {

  @Output() createRoomBtnClick: EventEmitter<ChatRoom> = new EventEmitter<ChatRoom>()
  roomName?: string;
  password?: string;

  onCreateRoom(): void {
    if(this.roomName !== undefined && this.password !== undefined) {
      const newChatRoom = new ChatRoom(this.roomName, this.password);
      this.createRoomBtnClick.emit(newChatRoom);
    }
  }

}
