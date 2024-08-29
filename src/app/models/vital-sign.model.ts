
export interface VitalSign {
  id: number;
  name: string;
  value?: string | number;
  unit?: string;
  delta?: string;
  measuredAt?: Date;
}
