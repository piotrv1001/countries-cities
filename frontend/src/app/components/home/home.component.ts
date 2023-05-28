import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  username: string = '';

  constructor(public router: Router) {}

  onNextBtnClick(): void {
    const navExtras = { state: { username: this.username } };
    this.router.navigate(['room-list'], navExtras);
  }

}
