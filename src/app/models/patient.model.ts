export interface Patient {
  firstName: string;
  middleName?:string;
  initials:string;
  lastName: string;
  dateOfBirth: Date;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  homePhysician?: string;
  lastUpdatedOn?: Date;
  lastUpdateFrom?: string;
  SVNR?: string;
}
