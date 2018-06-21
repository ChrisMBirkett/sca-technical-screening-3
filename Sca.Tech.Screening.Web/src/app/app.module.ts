import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  MatDatepickerModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';

import { DailyScheduleComponent } from './schedule/daily-schedule/daily-schedule.component';
import { ScheduleSearchResultsComponent } from './schedule/schedule-search-results/schedule-search-results.component';
import { ScheduleSearchCriteriaComponent } from './schedule/schedule-search-criteria/schedule-search-criteria.component';
import { HeaderComponent } from './header/header.component';

import { DailyScheduleService } from './shared/services/daily-schedule.service';
import { ExcelExportService } from './shared/services/excel-export.service';
import { NoticeDialogComponent } from './schedule/notice-dialog/notice-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyScheduleComponent,
    ScheduleSearchCriteriaComponent,
    ScheduleSearchResultsComponent,
    HeaderComponent,
    NoticeDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
  providers: [
    DailyScheduleService,
    ExcelExportService
  ],
  bootstrap: [AppComponent],
  entryComponents: [NoticeDialogComponent]
})
export class AppModule {}
