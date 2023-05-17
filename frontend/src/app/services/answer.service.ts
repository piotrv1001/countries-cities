import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AnswerService {
    constructor(private http: HttpClient) {}

    getCountriesAndCities(): Observable<any> {
        return this.http.get<any>(`https://countriesnow.space/api/v0.1/countries`, {observe: 'response'});
    }
}