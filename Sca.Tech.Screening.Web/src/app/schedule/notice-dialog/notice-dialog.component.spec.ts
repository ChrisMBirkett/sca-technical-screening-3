import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import { NoticeDialogComponent } from './notice-dialog.component';

xdescribe('NoticeDialogComponent', () => {
  let component: NoticeDialogComponent;
  let fixture: ComponentFixture<NoticeDialogComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [
        NoticeDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });

    fixture = TestBed.createComponent(NoticeDialogComponent);
    component = fixture.componentInstance;
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
