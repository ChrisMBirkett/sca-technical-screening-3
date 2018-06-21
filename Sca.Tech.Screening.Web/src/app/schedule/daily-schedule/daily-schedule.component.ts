import { Component, Inject, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Location, Schedule, SearchCriteria } from './../../shared/models';

import { DailyScheduleService } from '../../shared/services/daily-schedule.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})
export class DailyScheduleComponent implements OnInit, OnDestroy {

  locations: Location[];
  schedules: Schedule[];
  searchCriteria: SearchCriteria;

  private locationsSubscription: Subscription;
  private schedulesSubscription: Subscription;

  showSpinner: boolean = false;

  constructor(private dailyScheduleService: DailyScheduleService, public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.showSpinner = true;

    this.locationsSubscription = this.dailyScheduleService.getLocations().subscribe(
                                        (data: Location[]) => { this.locations = data; },
                                        err => { this.snackBar.open(err, 'Error getting locations', { duration: 5000 }); console.error(err); },
                                        () => { this.showSpinner = false; });

  }

  ngOnDestroy() {
    console.log('destroying DailyScheduleComponent ...');

    if (this.locationsSubscription) {
      this.locationsSubscription.unsubscribe();
    }
    if (this.schedulesSubscription) {
      this.schedulesSubscription.unsubscribe();
    }
  }

  onScheduleSearch(searchCriteria: SearchCriteria): void {

    this.snackBar.open('Search requested', 'Getting Schedules', { duration: 5000 });

    console.log(searchCriteria);

    this.searchCriteria = searchCriteria;

    this.showSpinner = true;

    this.schedulesSubscription = this.dailyScheduleService
                                    .getScheduleByLocationAndStartDate(searchCriteria.facilityId, searchCriteria.startDate)
                                    .subscribe(
                                      (data: Schedule[]) => { this.schedules = data; console.log(data) ;},
                                      err => { this.snackBar.open(err, 'Error getting schedules', { duration: 5000 }); console.error(err); },
                                      () => { this.showSpinner = false; });
  }
}
