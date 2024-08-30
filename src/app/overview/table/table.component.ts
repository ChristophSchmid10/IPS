// src/app/components/table/table.component.ts

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MedicationService } from '../../services/medication.service';
import { Medication } from '../../models/medication.model';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Data } from '../../enums/data.enum';
import { DiagnosisService } from '../../services/diagnosis.service';
import { Diagnosis } from '../../models/diagnosis.model';
import { LabValueService } from '../../services/lab-value.service';
import { ProcedureService } from '../../services/procedure.service';
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf, MatIconButton],
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Output() changeTableOrderEvent = new EventEmitter<void>();
  @Input() collapsed: boolean = false;
  @Input() dataType!: Data;
  dataToShow: any = [];
  filterText: string = '';
  headerLabels: string[] = [];

  constructor(
    private medicationService: MedicationService,
    private diagnosisService: DiagnosisService,
    private labValueService: LabValueService,
    private procedureServices: ProcedureService,
  ) {}

  ngOnInit() {
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
          .getMedications()
          .subscribe((data: Medication[]) => {
            this.dataToShow = data;
          });
        break;
      case Data.Diagnosis:
        this.headerLabels = ['Diagnose', 'Status', 'Bekannt seit'];
        this.diagnosisService.getDiagnoses().subscribe((data: Diagnosis[]) => {
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
        this.labValueService.getLabValues().subscribe((data: Diagnosis[]) => {
          this.dataToShow = data;
        });
        break;
      case Data.Procedure:
        this.headerLabels = ['Diagnose', 'Status', 'Durchgeführt/Geplant am'];
        this.procedureServices
          .getProcedures()
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
}
