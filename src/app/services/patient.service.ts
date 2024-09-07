import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/patient.model';
import {PatientEnum} from "../enums/patient.enum";

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patientData: Patient[] = [{
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
    patientType: PatientEnum.MedicalCheckup
  },
    {
    firstName: 'Maria',
    middleName: 'Johanna',
    lastName: 'Musterfrau',
    initials: 'MM',
    phoneNumber: '+43.664.1234567',
    email: 'musterfrau@provider.at',
    SVNR: '-',
    dateOfBirth: new Date('1961-12-24'),
    gender: 'weiblich',
    address: 'Musterstraße 13a, Eisenstadt, 7000, AUT',
    homePhysician: '-',
    patientType: PatientEnum.NoProblems
  }];


  constructor() {}

  getPatientData(patientType: PatientEnum): Observable<Patient |undefined> {
    const patient = this.patientData.find(patient => patient.patientType === patientType);
    return of(patient);
  }
}
