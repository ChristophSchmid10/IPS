
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MedicationService} from '../../services/medication.service';
import {Medication} from '../../models/medication.model';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Data} from '../../enums/data.enum';
import {DiagnosisService} from '../../services/diagnosis.service';
import {Diagnosis} from '../../models/diagnosis.model';
import {LabValueService} from '../../services/lab-value.service';
import {ProcedureService} from '../../services/procedure.service';
import {MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ValueDialogComponent} from '../../shared/value-dialog/value-dialog.component';
import {Router} from '@angular/router';
import {PatientEnum} from '../../enums/patient.enum';
import {MatChip} from '@angular/material/chips';
import {Status} from '../../enums/status.enum';
import {BreakpointService} from "../../services/breakpoint.service";
import {MatIcon} from "@angular/material/icon";
import {HelpComponent} from "../../shared/help/help.component";
import {HelpService} from "../../services/help.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf, MatIconButton, MatChip, NgClass, AsyncPipe, MatIcon, HelpComponent],
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
  layout: string = 'xl';
  activeFilters: Status[] = [];
  public showPoint = false;

  // Sortierlogik
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private medicationService: MedicationService,
    private diagnosisService: DiagnosisService,
    private labValueService: LabValueService,
    private procedureServices: ProcedureService,
    private dialog: MatDialog,
    private router: Router,
    private breakPointService: BreakpointService,
    private helpService: HelpService
  ) {}

  ngOnInit() {
    this.router.url === '/preventive-medical-checkup' ? this.patientType = PatientEnum.MedicalCheckup : this.patientType = PatientEnum.NoProblems;
    this.breakPointService.layout$.subscribe(layout => {
      this.layout = layout;
    });
    this.helpService.overlayState$.subscribe(state => {
      this.showPoint = state;
    });

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
            this.activeFilters = this.getDifferentMedicationStatus();
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
          this.activeFilters = this.getDifferentMedicationStatus();
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
          this.activeFilters = this.getDifferentMedicationStatus();
        });
        break;
      case Data.Procedure:
        this.headerLabels = [
          { label: 'Eingriff', field: 'name' },
          { label: 'Status', field: 'status' },
          { label: 'Durchgeführt / Geplant', field: 'doneAt' }
        ];
        this.procedureServices
          .getProcedures(this.patientType)
          .subscribe((data: Diagnosis[]) => {
            this.dataToShow = data;
            this.activeFilters = this.getDifferentMedicationStatus();
            console.log(this.dataToShow);
          });
        break;
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  get filteredData(): any {
    const filtered = this.dataToShow
      .filter((data: any) =>
        (data.name.toLowerCase().includes(this.filterText.toLowerCase()) &&
        this.activeFilters.includes(data.status)) || (data.hasOwnProperty('measuredFrom') && data.measuredFrom.toLowerCase().includes(this.filterText.toLowerCase()) &&
          this.activeFilters.includes(data.status))
      );


    if (this.sortColumn) {
      return filtered.sort((a: any, b: any) => this.sortData(a, b));
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
      width: '90%'
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

  getDifferentMedicationStatus(): Status[] {
    let returnData: Status[] = this.dataToShow.map((data: any) => data.status);
    return Array.from(new Set(returnData));
  }

  toggleFilter(status: Status) {
    if (this.activeFilters.includes(status)) {
      this.activeFilters = this.activeFilters.filter(s => s !== status);
    } else {
      this.activeFilters.push(status);
    }
  }

  getToolTipText(dataType: Data) {
    switch (dataType) {
      case Data.Medication:
        return 'Diese Tabelle zeigt eine Übersicht aller aktuellen Medikamente des Patienten. Jede Zeile enthält wichtige Informationen zu einem Medikament, einschließlich des Namens, des Status der Medikation (aktiv oder inaktiv), der Dosierung, dem Einnahmebeginn und dem geplanten Einnahmeende. Verwenden Sie das Suchfeld, um die Tabelle automatisch nach einem bestimmten Medikament zu filtern. Klicken Sie auf eine Medikamentenzeile, um weitere Details und Verwaltungsmöglichkeiten anzuzeigen.';
      case Data.Diagnosis:
        return 'Diese Tabelle zeigt eine Übersicht aller aktuellen und früheren Diagnosen des Patienten. Jede Zeile enthält wichtige Informationen zu einer Diagnose, einschließlich des Namens der Diagnose, des Status (aktiv, familiär oder abgeschlossen) und seit wann die Diagnose bekannt ist. Verwenden Sie das Suchfeld, um die Tabelle automatisch nach einer bestimmten Diagnose zu filtern. Nutzen Sie die Filteroptionen neben dem Suchfeld, um Diagnosen nach ihrem Status (aktiv, familiär oder abgeschlossen) anzuzeigen. Klicken Sie auf eine Diagnosezeile, um weitere Details und Verwaltungsmöglichkeiten anzuzeigen.';
      case Data.LabValue:
        return 'Diese Tabelle zeigt eine Übersicht der Laborergebnisse des Patienten. Jede Zeile enthält wichtige Informationen zu einem Laborparameter, einschließlich des Namens des Laborwerts, des Ergebnisses, des Datums der Messung und des Labors, das die Messung durchgeführt hat. Verwenden Sie das Suchfeld, um die Tabelle automatisch nach einem bestimmten Laborwert zu filtern. Klicken Sie auf eine Laborwert-Zeile, um weitere Details und Verwaltungsmöglichkeiten anzuzeigen.';
      case Data.Procedure:
        return 'Diese Tabelle zeigt eine Übersicht aller durchgeführten und geplanten medizinischen Eingriffe des Patienten. Jede Zeile enthält wichtige Informationen zu einem Eingriff, einschließlich des Namens des Eingriffs, des Status (abgeschlossen oder geplant) und des Jahres, in dem der Eingriff durchgeführt oder geplant wurde. Verwenden Sie das Suchfeld, um die Tabelle automatisch nach einem bestimmten Eingriff zu filtern. Klicken Sie auf eine Eingriffszeile, um weitere Details und Verwaltungsmöglichkeiten anzuzeigen.';
        default:
        return '';
    }

  }
}
