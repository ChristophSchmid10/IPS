import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Medication} from '../models/medication.model';
import {Status} from '../enums/status.enum';
import {SearchFieldData} from "../models/search-field-data.model";
import {Data} from "../enums/data.enum";
import {PatientEnum} from "../enums/patient.enum";

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  private medicationsPreventive: Medication[] = [
    {
      id: 1,
      name: 'EBETREXAT TBL 10MG',
      status: Status.Active,
      dosage: '2 Tablet | Oral use',
      startDate: new Date('2024-02-08'),
    },
    {
      id: 2,
      name: 'ELIQUIS FTBL 2,5MG',
      status: Status.Active,
      dosage: 'S:1-0-0-1',
      startDate: new Date('2024-02-08'),
    },
    {
      id: 3,
      name: 'FORXIGA FTBL 10MG',
      status: Status.Active,
      dosage: 'S:1-0-0-0',
      startDate: new Date('2024-02-08'),
    },
    {
      id: 4,
      name: 'GEROFOL TBL 5MG',
      status: Status.Active,
      dosage: 'S:MO, MI',
      startDate: new Date('2024-02-08'),
    },
    {
      id: 5,
      name: 'IBANDRONSAEURE SAN FSPR 3MG',
      status: Status.Active,
      dosage: 'S:0,33/Monat, alle 3 Monate',
      startDate: new Date('2024-02-08'),
    },
    {
      id: 6,
      name: 'METFORMIN HEX FTBL 500MG',
      status: Status.Active,
      dosage: 'S:1-0-0-1',
      startDate: new Date('2024-02-08'),
    },
    {
      id: 7,
      name: 'RAMIPRIL 1A TBL 5MG',
      status: Status.Active,
      dosage: 'S:1-0-0-1',
      startDate: new Date('2024-02-08'),
    },
    {
      id: 8,
      name: 'ROSUVASTATIN 1A FTBL 10MG',
      status: Status.Active,
      startDate: new Date('2024-02-08'),
    },
    {
      id: 9,
      name: 'SEMGLEE INJ 100E/ML FPEN 3ML',
      status: Status.Active,
      dosage: 'S:0-0-0-10',
      startDate: new Date('2024-02-08'),
    },
  ];

  private medicationsNoProblem: Medication[] = [];

  constructor() {}

  getMedications(patientType: PatientEnum): Observable<Medication[]> {
    return patientType === PatientEnum.MedicalCheckup ? of(this.medicationsPreventive) : of(this.medicationsNoProblem);
  }

  getMedicationNames(patientType: PatientEnum): Observable<SearchFieldData[]> {
    if (patientType === PatientEnum.MedicalCheckup) {
      return of(this.medicationsPreventive.map(medication => ({
        id: medication.id,
        name: medication.name,
        dataType: Data.Medication
      })));
    } else {
      return of(this.medicationsNoProblem.map(medication => ({
        id: medication.id,
        name: medication.name,
        dataType: Data.Medication
      })));
    }
  }

  getMedicationById(patientType: PatientEnum, id: number): Observable<Medication | undefined> {
    const medication = patientType === PatientEnum.MedicalCheckup ? this.medicationsPreventive.find(medication => medication.id === id) : this.medicationsNoProblem.find(medication => medication.id === id);
    return of(medication);
  }

}
