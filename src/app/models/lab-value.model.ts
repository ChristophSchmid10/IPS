import {Status} from "../enums/status.enum";

export interface LabValue {
  id: number;
  name: string;
  value?:string | Status;
  measuredAt: Date;
  measuredFrom: string;
}
