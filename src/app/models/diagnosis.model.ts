import {Status} from "../enums/status.enum";

export interface Diagnosis {
  id: number;
  name: string;
  status?:Status;
  startDate?: Date
}
