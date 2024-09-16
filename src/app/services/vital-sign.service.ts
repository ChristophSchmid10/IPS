import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VitalSign } from '../models/vital-sign.model';
import {SearchFieldData} from "../models/search-field-data.model";
import {Data} from "../enums/data.enum";
import {PatientEnum} from "../enums/patient.enum";

@Injectable({
  providedIn: 'root',
})
export class VitalSignService {
  private vitalSignsPreventive: VitalSign[] = [
    {
      id: 1,
      name: 'Körpergröße',
      value: 173,
      unit: 'cm',
      delta: 2,
      measuredAt: new Date('2024-02-08'),
    },
    {
      id: 2,
      name: 'Körpergewicht',
      value: 68,
      unit: 'kg',
      measuredAt: new Date('2024-02-08'),
      delta: null,
    },
    {
      id: 3,
      name: 'Body-Mass-Index',
      value: 22.72,
      unit: 'kg/m^2',
      measuredAt: new Date('2024-02-08'),
      delta: null,
    },
    {
      id: 4,
      name: 'Kopfumfang',
      value: null,
      unit: null,
      measuredAt: null,
      delta: null,
    },
    {
      id: 5,
      name: 'Brustumfang',
      value: null,
      unit: null,
      measuredAt: null,
      delta: null,
    },
    {
      id: 6,
      name: 'Hüftumfang',
      value: '<102',
      unit: 'cm',
      measuredAt: new Date('2024-02-08'),
      delta: null,
    },
    {
      id: 7,
      name: 'Herzfrequenz',
      value: 85,
      unit: '/min',
      measuredAt: new Date('2024-02-08'),
      delta: null,
    },
    {
      id: 8,
      name: 'Blutdruck',
      value: '130/80',
      unit: 'mm[Hq]',
      measuredAt: new Date('2024-02-08'),
      delta: null,
    },
    {
      id: 9,
      name: 'Blutzucker',
      value: null,
      unit: null,
      measuredAt: null,
      delta: null,
    },
    {
      id: 10,
      name: 'Raucherstatus',
      value: 'Nichtraucher',
      measuredAt: new Date('2024-02-08'),
      unit: null,
      delta: null,
    },
    {
      id: 11,
      name: 'Aktivität',
      value: '>2.5',
      unit: 'h/1 wk',
      measuredAt: new Date('2024-02-08'),
      delta: null,
    },
  ];

  private vitalSignsNoProblem: VitalSign[] = [
    {
      id: 1,
      name: 'Körpergröße',
      value: null,
      unit: null,
      delta: null,
      measuredAt: null,
    },
    {
      id: 2,
      name: 'Körpergewicht',
      value: null,
      unit: null,
      delta: null,
      measuredAt: null,
    },
    {
      id: 3,
      name: 'Body-Mass-Index',
      value: null,
      unit: null,
      delta: null,
      measuredAt: null,
    },
    {
      id: 4,
      name: 'Kopfumfang',
      value: null,
      unit: null,
      measuredAt: null,
      delta: null,
    },
    {
      id: 5,
      name: 'Brustumfang',
      value: null,
      unit: null,
      measuredAt: null,
      delta: null,
    },
    {
      id: 6,
      name: 'Hüftumfang',
      value: null,
      unit: null,
      delta: null,
      measuredAt: null,
    },
    {
      id: 7,
      name: 'Herzfrequenz',
      value: null,
      unit: null,
      delta: null,
      measuredAt: null,
    },
    {
      id: 8,
      name: 'Blutdruck',
      value: null,
      unit: null,
      delta: null,
      measuredAt: null,
    },
    {
      id: 9,
      name: 'Blutzucker',
      value: null,
      unit: null,
      delta: null,
      measuredAt: null,
    },
    {
      id: 10,
      name: 'Raucherstatus',
      value: null,
      unit: null,
      delta: null,
      measuredAt: null,
    },
    {
      id: 11,
      name: 'Aktivität',
      value: null,
      unit: null,
      delta: null,
      measuredAt: null,
    },
  ];


  constructor() {}

  getVitalSigns(patientType: PatientEnum): Observable<VitalSign[]> {
    return patientType === PatientEnum.MedicalCheckup ? of(this.vitalSignsPreventive) : of(this.vitalSignsNoProblem);
  }

  getVitalSignNames(patientType: PatientEnum): Observable<SearchFieldData[]> {
    if (patientType === PatientEnum.MedicalCheckup) {
      return of(this.vitalSignsPreventive.map(vitalSign => ({
        id: vitalSign.id,
        name: vitalSign.name,
        dataType: Data.VitalSign
      })));
    } else {
      return of(this.vitalSignsNoProblem.map(vitalSign => ({
        id: vitalSign.id,
        name: vitalSign.name,
        dataType: Data.VitalSign
      })));
    }
  }

  getVitalSignById(patientType: PatientEnum, id: number): Observable<VitalSign | undefined> {
    const vitalSign = patientType === PatientEnum.MedicalCheckup ? this.vitalSignsPreventive.find(vitalSign => vitalSign.id === id) : this.vitalSignsNoProblem.find(vitalSign => vitalSign.id === id);
    return of(vitalSign);
  }
}
