import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Status} from "../enums/status.enum";
import {Procedure} from "../models/procedure.model";

@Injectable({
  providedIn: 'root',
})
export class ProcedureService {
  private procedures: Procedure[] = [
    {
      id: 1,
      name: 'Total replacement of left hip joint',
      status: Status.Completed,
    },
    {
      id: 2,
      name: 'Appendectomy',
      status: Status.Completed,
    },
    {
      id: 3,
      name: 'History of colonoscopy',
      status: Status.Completed,
    },


  ];

  constructor() {}

  getProcedures(): Observable<Procedure[]> {
    return of(this.procedures);
  }
}
