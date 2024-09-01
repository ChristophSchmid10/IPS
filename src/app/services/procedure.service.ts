import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Status } from '../enums/status.enum';
import { Procedure } from '../models/procedure.model';

@Injectable({
  providedIn: 'root',
})
export class ProcedureService {
  private procedures: Procedure[] = [
    {
      id: 1,
      name: 'Total replacement of left hip joint',
      status: Status.Completed,
      doneAt: new Date(2010),
    },
    {
      id: 2,
      name: 'Appendectomy',
      status: Status.Completed,
      doneAt: new Date(1962),
    },
    {
      id: 3,
      name: 'History of colonoscopy',
      status: Status.Completed,
      doneAt: new Date(2014),
    },
  ];

  constructor() {}

  getProcedures(): Observable<Procedure[]> {
    return of(this.procedures);
  }
}
