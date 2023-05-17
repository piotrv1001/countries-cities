import { Component, OnInit } from '@angular/core';
import { AnswerService } from './services/answer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  data: any[] = [];
  countries: string[] = [];
  cities: string[] = [];
  constructor(private answerService: AnswerService) {}
  
  ngOnInit(): void {
    this.answerService.getCountriesAndCities().subscribe(
      (res: any) => {
        this.data = res.body.data
        this.data.forEach(value => {
          this.countries.push(value.country);
          value.cities.forEach((cities: string) => {
            this.cities.push(cities);
          })
        });
      }
    );
  }
}
