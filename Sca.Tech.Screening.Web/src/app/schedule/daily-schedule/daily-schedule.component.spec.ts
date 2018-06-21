import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup} from "@angular/forms";

import {
  MatDatepickerModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSnackBar,
  MatSpinner
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DailyScheduleComponent } from './daily-schedule.component';
import { DailyScheduleService } from '../../shared/services/daily-schedule.service';
import { Location, Schedule, SearchCriteria } from './../../shared/models';
import { ScheduleSearchCriteriaComponent } from '../schedule-search-criteria/schedule-search-criteria.component';
import { ScheduleSearchResultsComponent } from '../schedule-search-results/schedule-search-results.component';

describe('DailyScheduleComponent', () => {
  let component: DailyScheduleComponent;
  let fixture: ComponentFixture<DailyScheduleComponent>;
  let dailyScheduleService: any;

  beforeEach(() => {
    dailyScheduleService = jasmine.createSpyObj('DailyScheduleService', ['getLocations', 'getScheduleByLocationAndStartDate']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatMomentDateModule,
        MatDialogModule
      ],
      declarations: [
        DailyScheduleComponent,
        ScheduleSearchCriteriaComponent,
        ScheduleSearchResultsComponent
      ],
      providers: [
        { provide: DailyScheduleService, useValue: dailyScheduleService },
        MatSnackBar
      ]
    });

    fixture = TestBed.createComponent(DailyScheduleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a list of facilities on init', () => {
    const mockLocations: Location[] = [
      { facilityId: '1', facilityName: 'Location 1' }
    ];
    const getLocationsSpy = dailyScheduleService.getLocations.and.returnValue(mockLocations);

    fixture.detectChanges();

    expect(component.locations.length).toBe(1);
    expect(getLocationsSpy.calls.any()).toBe(true, 'getLocations called');
  });

  it('should set showSpinner to false after getting locations', () => {

    const mockLocations: Location[] = [
      { facilityId: '1', facilityName: 'Location 1' }
    ];
    const getLocationsSpy = dailyScheduleService.getLocations.and.returnValue(mockLocations);

    fixture.detectChanges();

    expect(component.showSpinner).toBe(false);
    expect(getLocationsSpy.calls.any()).toBe(true, 'getLocations called');

  });

  it('should get a list of schedules when onScheduleSearch called', () => {

    const mockSchedules: Schedule[] = [
      { teammateName: 'dolly parton', teammateType: 'secretary', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'OFF', sunday: 'OFF' }
    ];
    const getSchedulesSpy = dailyScheduleService.getScheduleByLocationAndStartDate.and.returnValue(mockSchedules);

    fixture.detectChanges();

    expect(component.schedules.length).toBe(1);
    expect(getSchedulesSpy.calls.any()).toBe(true, 'getLocations called');

  });
});
