import { Status } from '../enums/status.enum';

export interface Procedure {
  id: number;
  name: string;
  status?: Status;
  doneAt?: Date;
}
