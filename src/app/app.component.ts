import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { AllergyWarningComponent } from './patient-header/allergy-warning/allergy-warning.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { TableComponent } from './overview/table/table.component';
import { Data } from './enums/data.enum';
import { OverviewComponent } from './overview/overview.component';
import { VitalSignsComponent } from './vital-signs/vital-signs.component';
import {PreventiveMedicalCheckupComponent} from "./preventive-medical-checkup/preventive-medical-checkup.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PatientHeaderComponent,
    AllergyWarningComponent,
    MatTab,
    MatTabGroup,
    TableComponent,
    OverviewComponent,
    VitalSignsComponent,
    PreventiveMedicalCheckupComponent,
    NgIf,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'IPS';
  protected readonly Data = Data;
  showHeaderAndNav = true;

constructor(public router: Router) {}

  ngOnInit(): void {
  }
}
