import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

import * as moment from 'moment';
import * as _ from 'lodash';

import { Location, SearchCriteria } from './../../shared/models';

@Component({
  selector: 'app-schedule-search-criteria',
  templateUrl: './schedule-search-criteria.component.html',
  styleUrls: ['./schedule-search-criteria.component.css']
})
export class ScheduleSearchCriteriaComponent implements OnInit, OnDestroy {

  @Input() locations: Location[];
  @Output() searched = new EventEmitter<SearchCriteria>();

  dailyScheduleSearchForm: FormGroup;

  searchButtonLabel: string = 'Search';

  constructor(private formBuilder: FormBuilder) { 

    this.dailyScheduleSearchForm = formBuilder.group({
      facilitySelect: ['', Validators.required],
      startDatePicker: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  onlyMondaysFilter(date: Date): boolean {
    const day = moment(date).day();
    return day === 1;
  }

  search(): void {
    this.searchButtonLabel = 'Refresh';
    this.searched.emit(this.initializeSearchCriteriaModel());
  }

  private initializeSearchCriteriaModel(): SearchCriteria {

    const formModel = this.dailyScheduleSearchForm.value;
    const facilityId = formModel.facilitySelect as string;
    const startDate = formModel.startDatePicker.format('MM-DD-YYYY') as string;

    const location = _.find(this.locations, { facilityId: facilityId });

    return { facilityId: facilityId, facilityName: location.facilityName, startDate: startDate };
  }

}
