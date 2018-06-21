import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import {MatDialog} from '@angular/material';

import * as moment from 'moment';
import * as _ from 'lodash';

import { SearchCriteria, Schedule } from '../../shared/models';
import { NoticeDialogComponent } from '../notice-dialog/notice-dialog.component';
import { ExcelExportService } from './../../shared/services/excel-export.service';

@Component({
  selector: 'app-schedule-search-results',
  templateUrl: './schedule-search-results.component.html',
  styleUrls: ['./schedule-search-results.component.css']
})
export class ScheduleSearchResultsComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() searchCriteria: SearchCriteria;
  @Input() schedules: Schedule[];

  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'teammateName',
    'teammateType',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  mondayColumnLabel = 'Monday';
  tuesdayColumnLabel = 'Tuesday';
  wednesdayColumnLabel = 'Wednesday';
  thursdayColumnLabel = 'Thursday';
  fridayColumnLabel = 'Friday';
  saturdayColumnLabel = 'Saturday';
  sundayColumnLabel = 'Sunday';

  showTable = false;

  constructor(private noticeDialog: MatDialog, private excelExportService: ExcelExportService) {}

  ngOnInit() {
    this.setUpComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      const change = changes[propName];
      const to  = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      if (propName === 'searchCriteria' && change.previousValue) {
        if (from !== to) {
          this.setUpComponent();
        }
      }
    }
  }

  ngOnDestroy() {}

  isLessThanTwoAnesthesiologists(): boolean {
    const anesthesiologists = _.filter(
      this.schedules,
      schedule => schedule.teammateType === 'Anesthesia'
    );
    return anesthesiologists.length < 2;
  }

  exportToExcel(): void {
    const fileName = this.searchCriteria.facilityName + '_' +
                     this.searchCriteria.facilityId + '_' +
                     this.searchCriteria.startDate;
    this.excelExportService.exportAsExcelFile(this.schedules, fileName);
  }

  private setUpComponent(): void {
    // Note: redundant validation
    if (this.schedules && this.schedules.length > 0) {
      this.setUpDisplayColumnLabels();
      this.dataSource = new MatTableDataSource(this.schedules);
      this.dataSource.sort = this.sort;
      this.showTable = true;

      if (this.isLessThanTwoAnesthesiologists()) {
        setTimeout(() => {
          this.openDialog();
        });
      }
    }
  }

  private openDialog(): void {
    const dialogRef = this.noticeDialog.open(NoticeDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The notice dialog was closed');
    });
  }

  private setUpDisplayColumnLabels(): void {
    const mondayDate = moment(this.searchCriteria.startDate, 'MM/DD/YYYY');
    this.mondayColumnLabel = 'Monday ' + mondayDate.format('M/D');
    this.tuesdayColumnLabel = 'Tuesday ' + mondayDate.add(1, 'days').format('M/D');
    this.wednesdayColumnLabel = 'Wednesday ' + mondayDate.add(1, 'days').format('M/D');
    this.thursdayColumnLabel = 'Thursday ' + mondayDate.add(1, 'days').format('M/D');
    this.fridayColumnLabel = 'Friday ' + mondayDate.add(1, 'days').format('M/D');
    this.saturdayColumnLabel = 'Saturday ' + mondayDate.add(1, 'days').format('M/D');
    this.sundayColumnLabel = 'Sunday ' + mondayDate.add(1, 'days').format('M/D');
  }
}
