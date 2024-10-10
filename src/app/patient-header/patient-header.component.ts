
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AllergyWarningComponent } from './allergy-warning/allergy-warning.component';
import { GlobalSearchFieldComponent } from './global-search-field/global-search-field.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';
import { DatePipe, NgIf } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Router } from "@angular/router";
import { PatientEnum } from "../enums/patient.enum";
import { MatChip } from "@angular/material/chips";
import { HelpService } from '../services/help.service';
import {TableComponent} from "../overview/table/table.component";
import {BreakpointService} from "../services/breakpoint.service";
import {HelpComponent} from "../shared/help/help.component";

@Component({
  selector: 'app-patient-header',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    AllergyWarningComponent,
    GlobalSearchFieldComponent,
    MatIconButton,
    MatIcon,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatFormField,
    MatLabel,
    MatInput,
    DatePipe,
    NgIf,
    MatTabGroup,
    MatTab,
    TableComponent,
    MatChip,
    HelpComponent,
  ],
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.css'],
})
export class PatientHeaderComponent implements OnInit {
  patient: Patient | null | undefined = null;
  layout = 'xl';
  showPoint = false;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private breakPointService: BreakpointService,
    private helpService: HelpService
  ) {}

  ngOnInit(): void {
    this.breakPointService.layout$.subscribe(layout => {
      this.layout = layout;
    });

    if (this.router.url === '/preventive-medical-checkup') {
      this.patientService.getPatientData(PatientEnum.MedicalCheckup).subscribe(data => {
        this.patient = data;
      });
    } else {
      this.patientService.getPatientData(PatientEnum.NoProblems).subscribe(data => {
        this.patient = data;
      });
    }

    // Abonnieren des Overlay-Zustands
    this.helpService.overlayState$.subscribe(state => {
      this.showPoint = state;
    });
  }

  calculateAge(dateOfBirth?: Date): number | null {
    if (!dateOfBirth) {
      return null;
    }
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  stopPropagation($event: any) {
    $event.stopPropagation();
  }

  getTooltipText(content: string) {
  return content === 'avatar' ? "Hier könnte ein Bild des Patienten erscheinen, sofern eines im IPS enthalten ist."
    : "Dieser Bereich zeigt die wichtigsten Patientendaten auf einen Blick, einschließlich Name, Alter, Geschlecht und eventueller Allergien. Wenn eine Allergie vorliegt, wird sie hier prominent angezeigt, um sofortige Aufmerksamkeit zu gewährleisten. Klicken Sie auf den Header, um zusätzliche Informationen wie Adresse, Telefonnummer, Sozialversicherungsnummer und den Hausarzt des Patienten anzuzeigen. Diese erweiterten Details helfen bei der umfassenden Verwaltung und Betreuung des Patienten.";
  }
}
