import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Status } from '../enums/status.enum';
import { Procedure } from '../models/procedure.model';
import {SearchFieldData} from "../models/search-field-data.model";
import {Data} from "../enums/data.enum";
import {Medication} from "../models/medication.model";
import {PatientEnum} from "../enums/patient.enum";

@Injectable({
  providedIn: 'root',
})
export class ProcedureService {
  private proceduresPreventive: Procedure[] = [
    {
      id: 1,
      name: 'Total replacement of left hip joint',
      status: Status.Completed,
      doneAt: new Date('2010'),
    },
    {
      id: 2,
      name: 'Appendectomy',
      status: Status.Completed,
      doneAt: new Date('1962'),
    },
    {
      id: 3,
      name: 'History of colonoscopy',
      status: Status.Completed,
      doneAt: new Date('2014'),
    },
  ];

  private procedureNoProblem: Procedure[] = [];

  constructor() {}

  getProcedures(patientType: PatientEnum): Observable<Procedure[]> {
    return patientType === PatientEnum.MedicalCheckup ? of(this.proceduresPreventive) : of(this.procedureNoProblem);
  }

  getProcedureNames(patientType: PatientEnum): Observable<SearchFieldData[]> {
    if (patientType === PatientEnum.MedicalCheckup) {
      return of(this.proceduresPreventive.map(procedure => ({
        id: procedure.id,
        name: procedure.name,
        dataType: Data.Procedure
      })));
    } else {
      return of(this.procedureNoProblem.map(procedure => ({
        id: procedure.id,
        name: procedure.name,
        dataType: Data.Procedure
      })));
    }
  }

  getProcedureById(patientType: PatientEnum, id: number): Observable<Procedure | undefined> {
    const procedure = patientType === PatientEnum.MedicalCheckup ? this.proceduresPreventive.find(procedure => procedure.id === id) : this.procedureNoProblem.find(procedure => procedure.id === id);
    return of(procedure);
  }

}
