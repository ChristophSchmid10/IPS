import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor() {}

  getPatientData(): Observable<Patient> {
    // Hier sind die statischen Patientendaten
    const patientData: Patient = {
      firstName: 'Anton',
      lastName: 'Test',
      initials: 'AT',
      phoneNumber: '-',
      email: '-',
      SVNR: '-',
      dateOfBirth: new Date('1950-11-12'),
      gender: 'männlich',
      address: 'Am Schulweg 5, Hainfeld, 3100, AUT',
      homePhysician: 'Dr. Hannes',
      lastUpdatedOn: new Date('2024-02-08'),
      lastUpdateFrom: 'Dr. Hannes',
    };

    // Rückgabe der Daten als Observable
    return of(patientData);
  }
}
