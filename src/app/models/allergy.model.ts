import { Status } from '../enums/status.enum';

export interface Allergy {
  id: number;
  name: string;
  status?: Status;
}
