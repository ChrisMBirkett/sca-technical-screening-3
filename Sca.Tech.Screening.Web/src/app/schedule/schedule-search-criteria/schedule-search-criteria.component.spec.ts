import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ReactiveFormsModule, FormsModule, FormBuilder} from "@angular/forms";

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

import * as moment from 'moment';
import * as _ from 'lodash';

import { ScheduleSearchCriteriaComponent } from './schedule-search-criteria.component';

describe('ScheduleSearchCriteriaComponent', () => {
  let component: ScheduleSearchCriteriaComponent;
  let fixture: ComponentFixture<ScheduleSearchCriteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
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
      declarations: [ ScheduleSearchCriteriaComponent ],
      providers: [
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(ScheduleSearchCriteriaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onlyMondayFilter should return true when the date is a Monday', () => {
    const isMonday = component.onlyMondaysFilter(new Date('6/18/2018'));

    expect(isMonday).toBe(true);
  });

  it('#onlyMondayFilter should return false when the date is not a Monday', () => {
    const isMonday = component.onlyMondaysFilter(new Date('6/17/2018'));

    expect(isMonday).toBe(false);
  });

  it('should create a form with 2 controls', () => {
    expect(component.dailyScheduleSearchForm.contains('facilitySelect')).toBeTruthy();
    expect(component.dailyScheduleSearchForm.contains('startDatePicker')).toBeTruthy();
  });

  it('should make the facilitySelect control required', () => {
    const control = component.dailyScheduleSearchForm.get('facilitySelect');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the startDatePicker control required', () => {
    const control = component.dailyScheduleSearchForm.get('startDatePicker');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should set searchButtonLabel to Refresh when search() is called', () => {

    fixture.detectChanges();

    component.locations = [{ facilityId: '000001', facilityName: 'a fake location' }];

    const facilityControl = component.dailyScheduleSearchForm.get('facilitySelect');
    facilityControl.setValue('000001');
    const startDateControl = component.dailyScheduleSearchForm.get('startDatePicker');
    startDateControl.setValue(moment('6/18/2018', 'MM/DD/YYYY'));

    expect(component.searchButtonLabel).toBe('Search', 'Search button label initial value');

    component.search();

    expect(component.searchButtonLabel).toBe('Refresh', 'Search button label value after search called');
  });

  it('should raise searched event when search button is clicked', () => {

    fixture.detectChanges();

    component.locations = [{ facilityId: '000001', facilityName: 'a fake location' }];

    const facilityControl = component.dailyScheduleSearchForm.get('facilitySelect');
    facilityControl.setValue('000001');
    const startDateControl = component.dailyScheduleSearchForm.get('startDatePicker');
    startDateControl.setValue(moment('6/18/2018', 'MM/DD/YYYY'));

    let searchCriteria = null;
    component.searched.subscribe(search => searchCriteria = search);

    component.search();

    expect(searchCriteria).not.toBeNull();
  });
});
