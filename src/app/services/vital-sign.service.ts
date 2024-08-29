import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {VitalSign} from "../models/vital-sign.model";

@Injectable({
  providedIn: 'root',
})
export class VitalSignService {
  private vitalSigns: VitalSign[] = [
    {
      id: 1,
      name: 'Körpergröße',
      value: 173,
      unit:'cm',
      delta: '2',
      measuredAt: new Date('2024-02-08')
    },
    {
      id: 2,
      name: 'Körpergewicht',
      value: 68,
      unit:'kg',
      measuredAt: new Date('2024-02-08')
    },
    {
      id: 3,
      name: 'Body-Mass-Index',
      value: 22.72,
      unit:'kg/m^2',
      measuredAt: new Date('2024-02-08')
    },
    {
      id: 4,
      name: 'Kopfumfang',
    },
    {
      id: 5,
      name: 'Brustumfang',
    },
    {
      id: 6,
      name: 'Hüftumfang',
      value: '<102',
      unit:'cm',
      measuredAt: new Date('2024-02-08')
    },
    {
      id: 7,
      name: 'Herzfrequenz',
      value: 85,
      unit:'/min',
      measuredAt: new Date('2024-02-08')
    },
    {
      id: 8,
      name: 'Blutdruck',
      value: '130/80',
      unit:'mm[Hq]',
      measuredAt: new Date('2024-02-08')
    },
    {
      id: 9,
      name: 'Blutzucker',
    },
    {
      id: 10,
      name: 'Raucherstatus',
      value: 'Nichtraucher',
      measuredAt: new Date('2024-02-08')
    },
    {
      id: 11,
      name: 'Aktivität',
      value: '>2.5',
      unit: 'h/1 wk',
      measuredAt: new Date('2024-02-08')
    },

  ];

  constructor() {}

  getVitalSigns(): Observable<VitalSign[]> {
    return of(this.vitalSigns);
  }
}
