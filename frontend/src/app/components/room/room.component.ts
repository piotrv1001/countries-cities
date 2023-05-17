import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_ADDRESS, SERVER_PORT } from 'src/app/app.constants';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  socket$?: WebSocketSubject<any>;
  currentUsername?: string;
  usernameArray: string[] = [];
  webSocketSub?: Subscription;

  constructor(public router: Router) {
    this.currentUsername = this.router.getCurrentNavigation()?.extras?.state?.["username"];
  }

  ngOnInit(): void {
    this.socket$ = webSocket(`ws://${SERVER_ADDRESS}:${SERVER_PORT}`);
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

  ngOnDestroy(): void {
    this.socket$?.complete();
    this.webSocketSub?.unsubscribe();
  }

}
