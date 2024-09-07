import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Status } from '../enums/status.enum';
import { LabValue } from '../models/lab-value.model';
import {SearchFieldData} from "../models/search-field-data.model";
import {Data} from "../enums/data.enum";
import {PatientEnum} from "../enums/patient.enum";

@Injectable({
  providedIn: 'root',
})
export class LabValueService {
  private labValuesPreventive: LabValue[] = [
    {
      id: 1,
      name: 'ABO and Rh group [Type] in Blood',
      value: 'Blood group A Rh(D) positive (finding)',
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 2,
      name: 'Cholesterin',
      value: '180 mg/dL',
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 3,
      name: 'HDL-Cholesterin',
      value: '45 mg/dL',
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 4,
      name: 'Cholesterol.total/Cholesterol in HDL  [Mass Ratio] in Serum or Plasma',
      value: '4',
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 5,
      name: 'Triglyceride',
      value: 'Blood group A Rh(D) positive (finding)',
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 6,
      name: 'Gamma-GT',
      value: '54 U/L',
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 7,
      name: 'Urindiagnostik',
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 8,
      name: 'Leukocytes [Presence] in Urine',
      value: Status.NotDetected,
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 9,
      name: 'Protein [Presence] in Urine',
      value: Status.NotDetected,
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 10,
      name: 'Glucose [Presence] in Urine',
      value: Status.NotDetected,
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 11,
      name: 'Blood [Presence] in Urine by Visual',
      value: Status.NotDetected,
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 12,
      name: 'Nitrite [Presence] in Urine',
      value: Status.NotDetected,
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
    {
      id: 13,
      name: 'Urobilinogen [Presence] in Urine',
      value: Status.NotDetected,
      measuredAt: new Date('2024-02-08'),
      measuredFrom: 'Amadeus Spital - Labor',
    },
  ];

  private labValuesNoProblem: LabValue[] = [];

  constructor() {}

  getLabValues(patientType: PatientEnum): Observable<LabValue[]> {
    return patientType === PatientEnum.MedicalCheckup ? of(this.labValuesPreventive) : of(this.labValuesNoProblem);
  }

  getLabValueNames(patientType: PatientEnum): Observable<SearchFieldData[]> {
    if (patientType === PatientEnum.MedicalCheckup) {
      return of(this.labValuesPreventive.map(labValue => ({
        id: labValue.id,
        name: labValue.name,
        dataType: Data.Medication
      })));
    } else {
      return of(this.labValuesNoProblem.map(labValue => ({
        id: labValue.id,
        name: labValue.name,
        dataType: Data.Medication
      })));
    }
  }

  getLabValueById(patientType: PatientEnum, id: number): Observable<LabValue | undefined> {
    const labValue = patientType === PatientEnum.MedicalCheckup ? this.labValuesPreventive.find(labValue => labValue.id === id) : this.labValuesNoProblem.find(labValue => labValue.id === id);
    return of(labValue);
  }
}
