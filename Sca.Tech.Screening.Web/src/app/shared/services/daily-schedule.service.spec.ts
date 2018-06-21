import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpClientModule,
  HttpRequest,
  HttpParams,
  HttpEvent, 
  HttpEventType
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

import { DailyScheduleService } from './daily-schedule.service';

import { environment } from '../../../environments/environment';

import { Location, Schedule } from '../models';

describe('DailyScheduleService', () => {

  let httpMock: HttpTestingController;
  let service: DailyScheduleService;
  let httpClientSpy;

  const mockLocations: Location[] = [
    { facilityId: '000001', facilityName: 'facility 1' },
    { facilityId: '000001', facilityName: 'facility 1' }
  ];

  const mockSchedules: Schedule[] = [
    { teammateName: 'dolly parton', teammateType: 'secretary', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'OFF', sunday: 'OFF' },
    { teammateName: 'melanie griffith', teammateType: 'anesthesia', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'OFF', sunday: 'OFF' },
  ];

  const mockLocationReturn = {
    body: {
      data: mockLocations
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DailyScheduleService]
    });

    httpClientSpy = jasmine.createSpyObj('Http', ['get']);
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(DailyScheduleService);

    jasmine.getEnv().allowRespy(true);
  });

  // afterEach(inject(
  //   [HttpTestingController],
  //   (backend: HttpTestingController) => {
  //     backend.verify();
  //   }
  // ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLocations should get locations', () => {

      // spyOn(service, 'getLocations').and.returnValue(Observable.of(mockLocations));
      spyOn(httpClientSpy, 'get').and.returnValue(Observable.of(mockLocations));

      service.getLocations().subscribe((locations: Location[]) => {
        expect(locations.length).toBe(2);
        expect(locations).toEqual(mockLocations);
      });

      // const mockReq = httpMock.expectOne(environment.getLocationsApi);
      // expect(mockReq.request.method).toBe('GET');
      // expect(mockReq.request.responseType).toEqual('json');
      // mockReq.flush(mockLocationReturn);

      // httpMock.verify();
    }
  );

  it('getScheduleByLocationAndStartDate should get Observable<Schedule[]>', () => {

      // spyOn(service, 'getScheduleByLocationAndStartDate').and.returnValue(Observable.of(mockSchedules));
      spyOn(httpClientSpy, 'get').and.returnValue(Observable.of(mockSchedules));

      service.getScheduleByLocationAndStartDate('00001', '6/11/2018').subscribe((schedules: Schedule[]) => {
        expect(schedules.length).toBe(2);
        expect(schedules).toEqual(mockSchedules);
      });

      // const mockReq = httpMock.expectOne(environment.getLocationsApi);
      // expect(mockReq.request.method).toBe('GET');
      // expect(mockReq.request.responseType).toEqual('json');
      // mockReq.flush(mockLocationReturn);

      // httpMock.verify();
    }
  );
});
