import { Status } from '../enums/status.enum';

export interface Medication {
  id: number;
  name: string;
  status?: Status;
  startDate?: Date;
  endDate?: Date;
  dosage?: string;
}
