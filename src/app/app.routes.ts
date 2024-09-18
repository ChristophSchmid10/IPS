import { Routes } from '@angular/router';
import {PreventiveMedicalCheckupComponent} from "./preventive-medical-checkup/preventive-medical-checkup.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'preventive-medical-checkup', component: PreventiveMedicalCheckupComponent, canActivate: [AuthGuard] },
  { path: 'no-allergies-medication-problems', component: PreventiveMedicalCheckupComponent, canActivate: [AuthGuard] }
];
