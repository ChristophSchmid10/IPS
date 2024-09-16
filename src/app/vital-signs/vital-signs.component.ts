import {Component, OnInit} from '@angular/core';
import {VitalSignService} from '../services/vital-sign.service';
import {VitalSign} from '../models/vital-sign.model';
import {VitalSignCardComponent} from './vital-sign-card/vital-sign-card.component';
import {PatientEnum} from "../enums/patient.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vital-signs',
  standalone: true,
  imports: [VitalSignCardComponent],
  templateUrl: './vital-signs.component.html',
  styleUrl: './vital-signs.component.css',
})
export class VitalSignsComponent implements OnInit {
  vitalSigns: VitalSign[] = [];
  protected patientType: PatientEnum = PatientEnum.MedicalCheckup;
  constructor(private vitalSignService: VitalSignService,
              private router: Router) {}

  ngOnInit() {
    this.router.url === '/preventive-medical-checkup' ? this.patientType = PatientEnum.MedicalCheckup : this.patientType = PatientEnum.NoProblems;
    this.vitalSignService.getVitalSigns(this.patientType).subscribe((data: VitalSign[]) => {
      this.vitalSigns = data;
    });
  }

  getVitalSign(name: string) {
    const filteredVitalSign = this.vitalSigns.find(
      (vitalSign) => vitalSign.name === name,
    );
    return filteredVitalSign ? filteredVitalSign : undefined;
  }

  protected readonly PatientEnum = PatientEnum;
}
