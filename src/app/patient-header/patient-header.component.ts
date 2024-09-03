import { Component, OnInit } from '@angular/core';
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
import { TableComponent } from '../overview/table/table.component';

@Component({
  selector: 'app-patient-header',
  standalone: true,
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
  ],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.css',
})
export class PatientHeaderComponent implements OnInit {
  patient: Patient | null = null;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatientData().subscribe((data: Patient) => {
      this.patient = data;
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

  stopPropagation($event: MouseEvent) {
    $event.stopPropagation();
  }
}
