import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  MatDialog
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ScheduleSearchResultsComponent } from './schedule-search-results.component';

import { ExcelExportService } from './../../shared/services/excel-export.service';

describe('ScheduleSearchResultsComponent', () => {
  let component: ScheduleSearchResultsComponent;
  let fixture: ComponentFixture<ScheduleSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
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
        ScheduleSearchResultsComponent
      ],
      providers: [
        MatDialog,
        ExcelExportService
      ]
    });

  fixture = TestBed.createComponent(ScheduleSearchResultsComponent);
  component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the daily column labels on init', () => {

    component.searchCriteria = { facilityId: '000001', facilityName: 'fake location 1', startDate: '6/18/2018' };
    component.schedules = [{ teammateName: 'dolly parton', teammateType: 'secretary', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'OFF', sunday: 'OFF' }];

    fixture.detectChanges();

    expect(component.mondayColumnLabel).toContain('Monday');
    expect(component.tuesdayColumnLabel).toContain('Tuesday');
    expect(component.wednesdayColumnLabel).toContain('Wednesday');
    expect(component.thursdayColumnLabel).toContain('Thursday');
    expect(component.fridayColumnLabel).toContain('Friday');
    expect(component.saturdayColumnLabel).toContain('Saturday');
    expect(component.sundayColumnLabel).toContain('Sunday');

  });

  it('should set dataSource to a non-null value on init', () => {
    component.searchCriteria = { facilityId: '000001', facilityName: 'fake location 1', startDate: '6/18/2018' };
    component.schedules = [{ teammateName: 'dolly parton', teammateType: 'secretary', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'OFF', sunday: 'OFF' }];

    fixture.detectChanges();

    expect(component.dataSource).not.toBeNull();
  });

  it('should set showTable to a true value on init when a collection of schedules is passed in', () => {
    component.searchCriteria = { facilityId: '000001', facilityName: 'fake location 1', startDate: '6/18/2018' };
    component.schedules = [{ teammateName: 'dolly parton', teammateType: 'secretary', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'OFF', sunday: 'OFF' }];

    fixture.detectChanges();

    expect(component.showTable).toBeTruthy();
  });

  it('should set showTable to a false value on init when an empty collection of schedules is passed in', () => {
    component.searchCriteria = { facilityId: '000001', facilityName: 'fake location 1', startDate: '6/18/2018' };
    component.schedules = [];

    fixture.detectChanges();

    expect(component.showTable).toBeFalsy();
  });

  it('#isLessThanTwoAnesthesiologists should return true when less than two anesthesiologists are in the schedule collection', () => {
    component.searchCriteria = { facilityId: '000001', facilityName: 'fake location 1', startDate: '6/18/2018' };
    component.schedules = [{ teammateName: 'dolly parton', teammateType: 'secretary', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'OFF', sunday: 'OFF' }];

    fixture.detectChanges();

    const has2Anesthesiologists = component.isLessThanTwoAnesthesiologists();

    expect(has2Anesthesiologists).toBeTruthy();
  });

  it('#isLessThanTwoAnesthesiologists should return false when two or more anesthesiologists are in the schedule collection', () => {
    component.searchCriteria = { facilityId: '000001', facilityName: 'fake location 1', startDate: '6/18/2018' };
    component.schedules = [
      { teammateName: 'dolly parton', teammateType: 'Anesthesia', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'OFF', sunday: 'OFF' },
      { teammateName: 'melanie griffith', teammateType: 'Anesthesia', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'OFF', sunday: 'OFF' }
    ];

    fixture.detectChanges();

    const has2Anesthesiologists = component.isLessThanTwoAnesthesiologists();

    expect(has2Anesthesiologists).toBeFalsy();
  });
});
