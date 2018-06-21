import { Environment } from './environment-interface';

export const environment: Environment = {
  production: true,
  getLocationsApi: 'http://www.scadevjobs.com/api/Locations',
  getScheduleByLocationAndStartDateApi: 'http://www.scadevjobs.com/api/Schedules/'
};
