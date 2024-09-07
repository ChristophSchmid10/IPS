// src/app/components/table/table.component.ts

import {Component, EventEmitter, Input, OnChanges, OnInit, Output,} from '@angular/core';
import {MedicationService} from '../../services/medication.service';
import {Medication} from '../../models/medication.model';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Data} from '../../enums/data.enum';
import {DiagnosisService} from '../../services/diagnosis.service';
import {Diagnosis} from '../../models/diagnosis.model';
import {LabValueService} from '../../services/lab-value.service';
import {ProcedureService} from '../../services/procedure.service';
import {MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ValueDialogComponent} from '../../shared/value-dialog/value-dialog.component';
import {Router} from "@angular/router";
import {PatientEnum} from "../../enums/patient.enum";
import {MatChip} from "@angular/material/chips";
import {Status} from "../../enums/status.enum";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf, MatIconButton, MatChip, NgClass],
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Output() changeTableOrderEvent = new EventEmitter<void>();
  @Input() collapsed: boolean = false;
  @Input() dataType!: Data;
  dataToShow: any = [];
  filterText: string = '';
  headerLabels: string[] = [];
  patientType: PatientEnum = PatientEnum.MedicalCheckup;
  dataLoaded = false;


  constructor(
    private medicationService: MedicationService,
    private diagnosisService: DiagnosisService,
    private labValueService: LabValueService,
    private procedureServices: ProcedureService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.url === '/preventive-medical-checkup' ? this.patientType = PatientEnum.MedicalCheckup : this.patientType = PatientEnum.NoProblems;
    switch (this.dataType) {
      case Data.Medication:
        this.headerLabels = [
          'Medikament',
          'Status',
          'Dosierung',
          'Einnahme seit',
          'Einnahme bis',
        ];

        this.medicationService
          .getMedications(this.patientType)
          .subscribe((data: Medication[]) => {
            this.dataToShow = data;
            this.dataLoaded = true;
          });
        break;
      case Data.Diagnosis:
        this.headerLabels = ['Diagnose', 'Status', 'Bekannt seit'];
        this.diagnosisService.getDiagnoses(this.patientType).subscribe((data: Diagnosis[]) => {
          this.dataToShow = data;
        });
        break;
      case Data.LabValue:
        this.headerLabels = [
          'Laborwert',
          'Ergebenis',
          'Gemessen am',
          'Gemessen von',
        ];
        this.labValueService.getLabValues(this.patientType).subscribe((data: Diagnosis[]) => {
          this.dataToShow = data;
        });
        break;
      case Data.Procedure:
        this.headerLabels = ['Einriff', 'Status', 'Durchgeführt/Geplant am'];
        this.procedureServices
          .getProcedures(this.patientType)
          .subscribe((data: Diagnosis[]) => {
            this.dataToShow = data;
          });
        break;
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  get filteredData(): any {
    // @ts-ignore
    return this.dataToShow.filter((data) =>
      data.name.toLowerCase().includes(this.filterText.toLowerCase()),
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterText = filterValue.trim().toLowerCase();
  }

  getImage(): string {
    return 'assets/Icons/' + this.dataType.toString() + '.svg';
  }

  protected readonly Data = Data;

  changeTableOrder() {
    this.changeTableOrderEvent.emit();
  }

  onRowClick(dataSet: any, dataType: Data): void {
    const dialogRef = this.dialog.open(ValueDialogComponent, {
      data: [dataType, dataSet],
    });
  }

  isStatus(value: any): boolean {
    return Object.values(Status).includes(value);
  }

  protected readonly PatientEnum = PatientEnum;
  protected readonly Status = Status;
}
