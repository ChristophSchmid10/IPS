import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Status } from '../enums/status.enum';
import { Diagnosis } from '../models/diagnosis.model';
import {SearchFieldData} from "../models/search-field-data.model";
import {Data} from "../enums/data.enum";
import {VitalSign} from "../models/vital-sign.model";
import {PatientEnum} from "../enums/patient.enum";
import {Medication} from "../models/medication.model";

@Injectable({
  providedIn: 'root',
})
export class DiagnosisService {
  private diagnosesPreventive: Diagnosis[] = [
    {
      id: 1,
      name: 'Chronic kidney disease stage 3B',
      status: Status.Active,
    },
    {
      id: 2,
      name: 'Long-term current use of anticoagulant',
      status: Status.Active,
    },
    {
      id: 3,
      name: 'Diabetic on insulin and oral treatment',
      status: Status.Active,
    },
    {
      id: 4,
      name: 'Long-term current use of immunosuppressive drug',
      status: Status.Active,
    },
    {
      id: 5,
      name: 'Hypertensive disorder',
      status: Status.Active,
    },
    {
      id: 6,
      name: 'Carotid artery doppler normal',
      status: Status.Active,
    },
    {
      id: 7,
      name: 'Coronary arteriography normal',
      status: Status.Active,
    },
    {
      id: 8,
      name: 'Family history of cancer of colon',
      status: Status.Family,
    },
    {
      id: 9,
      name: 'History of measles',
      status: Status.Completed,
    },
    {
      id: 10,
      name: 'Long-term current use of bisphosphonates',
      status: Status.Active,
    },
    {
      id: 11,
      name: 'Permanent atrial fibrillation',
      status: Status.Active,
    },
    {
      id: 12,
      name: 'Albuminuria grade A2',
      status: Status.Active,
    },
    {
      id: 13,
      name: 'Seronegative rheumatoid arthritis',
      status: Status.Active,
    },
    {
      id: 14,
      name: 'Hypercholesterolemia',
      status: Status.Active,
    },
    {
      id: 15,
      name: 'Family history of diabetes mellitus (situation)s',
      status: Status.Family,
    },
    {
      id: 16,
      name: 'FH: Hypercholesterolemia',
      status: Status.Family,
    },
    {
      id: 17,
      name: 'Periodontal disease (disorder)',
      status: Status.Completed,
    },
    {
      id: 18,
      name: 'History of chickenpox (situation)',
      status: Status.Completed,
    },
  ];

  private diagnosesNoProblem: Diagnosis[] = [];

  constructor() {}

  getDiagnoses(patientType: PatientEnum): Observable<Diagnosis[]> {
    return patientType === PatientEnum.MedicalCheckup ? of(this.diagnosesPreventive) : of(this.diagnosesNoProblem);
  }

  getDiagnosesNames(patientType: PatientEnum): Observable<SearchFieldData[]> {
    if (patientType === PatientEnum.MedicalCheckup) {
      return of(this.diagnosesPreventive.map(diagnosis => ({
        id: diagnosis.id,
        name: diagnosis.name,
        dataType: Data.Medication
      })));
    } else {
      return of(this.diagnosesNoProblem.map(diagnosis => ({
        id: diagnosis.id,
        name: diagnosis.name,
        dataType: Data.Medication
      })));
    }
  }

  getDiagnosisById(patientType: PatientEnum, id: number): Observable<Diagnosis | undefined> {
    const diagnosis = patientType === PatientEnum.MedicalCheckup ? this.diagnosesPreventive.find(diagnosis => diagnosis.id === id) : this.diagnosesNoProblem.find(diagnosis => diagnosis.id === id);
    return of(diagnosis);
  }

}
