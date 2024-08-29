import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Medication } from '../models/medication.model';
import { Status } from '../enums/status.enum';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  private medications: Medication[] = [
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

  constructor() {}

  getMedications(): Observable<Medication[]> {
    return of(this.medications);
  }
}
