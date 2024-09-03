export interface VitalSign {
  id: number;
  name: string;
  value: string | number | null;
  unit: string | null;
  delta: number | null;
  measuredAt: Date | null;
}
