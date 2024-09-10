
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MedicationService } from '../../services/medication.service';
import { Medication } from '../../models/medication.model';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Data } from '../../enums/data.enum';
import { DiagnosisService } from '../../services/diagnosis.service';
import { Diagnosis } from '../../models/diagnosis.model';
import { LabValueService } from '../../services/lab-value.service';
import { ProcedureService } from '../../services/procedure.service';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ValueDialogComponent } from '../../shared/value-dialog/value-dialog.component';
import { Router } from '@angular/router';
import { PatientEnum } from '../../enums/patient.enum';
import { MatChip } from '@angular/material/chips';
import { Status } from '../../enums/status.enum';

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
  headerLabels: { label: string, field: string }[] = [];
  patientType: PatientEnum = PatientEnum.MedicalCheckup;
  dataLoaded = false;

  // Sortierlogik
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

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
          { label: 'Medikament', field: 'name' },
          { label: 'Status', field: 'status' },
          { label: 'Dosierung', field: 'dosage' },
          { label: 'Einnahme seit', field: 'startDate' },
          { label: 'Einnahme bis', field: 'endDate' },
        ];

        this.medicationService
          .getMedications(this.patientType)
          .subscribe((data: Medication[]) => {
            this.dataToShow = data;
            this.dataLoaded = true;
          });
        break;
      case Data.Diagnosis:
        this.headerLabels = [
          { label: 'Diagnose', field: 'name' },
          { label: 'Status', field: 'status' },
          { label: 'Bekannt seit', field: 'startDate' }
        ];
        this.diagnosisService.getDiagnoses(this.patientType).subscribe((data: Diagnosis[]) => {
          this.dataToShow = data;
        });
        break;
      case Data.LabValue:
        this.headerLabels = [
          { label: 'Laborwert', field: 'name' },
          { label: 'Ergebnis', field: 'value' },
          { label: 'Gemessen am', field: 'measuredAt' },
          { label: 'Gemessen von', field: 'measuredFrom' },
        ];
        this.labValueService.getLabValues(this.patientType).subscribe((data: Diagnosis[]) => {
          this.dataToShow = data;
        });
        break;
      case Data.Procedure:
        this.headerLabels = [
          { label: 'Eingriff', field: 'name' },
          { label: 'Status', field: 'status' },
          { label: 'Durchgeführt/Geplant am', field: 'doneAt' }
        ];
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
    const filtered = this.dataToShow
      .filter((data:any) =>
        data.name.toLowerCase().includes(this.filterText.toLowerCase())
      );

    if (this.sortColumn) {
      return filtered.sort((a:any, b:any) => this.sortData(a, b));
    }

    return filtered;
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

  sortData(a: any, b: any): number {
    const aValue = a[this.sortColumn];
    const bValue = b[this.sortColumn];

    if (aValue == null || bValue == null) {
      return 0;
    }

    let comparison = 0;

    if (aValue > bValue) {
      comparison = 1;
    } else if (aValue < bValue) {
      comparison = -1;
    }

    return this.sortDirection === 'asc' ? comparison : -comparison;
  }

  onHeaderClick(header: { label: string, field: string }) {
    if (this.sortColumn === header.field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = header.field;
      this.sortDirection = 'asc';
    }
  }
}
