import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Location, Schedule } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DailyScheduleService {

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    const headers = new HttpHeaders({ Accept: 'application/json' });
    return this.http
      .get<Location[]>(environment.getLocationsApi, { headers, observe: 'response' })
      .pipe(map(response => response['body']['data']));
  }

  getScheduleByLocationAndStartDate(
    facilityId: string,
    startDate: string
  ): Observable<Schedule[]> {
    const url = environment.getScheduleByLocationAndStartDateApi + facilityId + '/' + startDate;
    console.log(url);
    const headers = new HttpHeaders({ Accept: 'application/json' });
    return this.http
      .get<any>(url, { headers, observe: 'response' })
      .pipe(map(response => response['body']['data']));
  }
}
