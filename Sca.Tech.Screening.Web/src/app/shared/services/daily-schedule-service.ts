import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Location, Schedule } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DailyScheduleService {
  private headers = new Headers({ Accept: 'application/json' });

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http
      .get<any>(environment.getLocationsApi)
      .pipe(map(result => result['data']));
  }

  getScheduleByLocationAndStartDate(
    facilityId: string,
    startDate: string
  ): Observable<Schedule[]> {
    return this.http
      .get<any>(environment.getScheduleByLocationAndStartDateApi + '${facilityId}/${startDate}')
      .pipe(map(result => result['data']));
  }
}
