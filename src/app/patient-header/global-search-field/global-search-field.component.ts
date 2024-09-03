import { Component, OnInit } from '@angular/core';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import {debounceTime, map, Observable, startWith} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MedicationService} from "../../services/medication.service";
import {DiagnosisService} from "../../services/diagnosis.service";
import {LabValueService} from "../../services/lab-value.service";
import {ProcedureService} from "../../services/procedure.service";
import {VitalSignService} from "../../services/vital-sign.service";
import {SearchFieldData} from "../../models/search-field-data.model";
import {ValueDialogComponent} from "../../shared/value-dialog/value-dialog.component";
import {Data} from "../../enums/data.enum";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-global-search-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
  ],

  templateUrl: './global-search-field.component.html',
  styleUrl: './global-search-field.component.css',
})
export class GlobalSearchFieldComponent implements OnInit {
  searchControl = new FormControl('');
  options: string[] = [];
  filteredOptions: SearchFieldData[] = [];
  loadedData: SearchFieldData[] = [];

  constructor(private medicationService: MedicationService,
              private diagnosisService: DiagnosisService,
              private labValueService: LabValueService,
              private procedureService: ProcedureService,
              private vitalSignService: VitalSignService,
              private dialog: MatDialog) {
  }

  ngOnInit() {

    this.loadData();

    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.filteredOptions = this._filter(value || "");
    });
  }

  private _filter(value: string): SearchFieldData[] {
    const filterValue = value.toLowerCase();
    return this.loadedData.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectOption(option: SearchFieldData) {
    this.searchControl.setValue(option.name);
    this.filteredOptions = [];
    this.onRowClick(option.id, option.dataType)
  }

  loadData() {
    this.medicationService.getMedicationNames().subscribe(medicationData => {
      this.loadedData = this.loadedData.concat(medicationData);
      this.options = this.options.concat(this.loadedData.map(data => data.name));

    });
    this.diagnosisService.getDiagnosesNames().subscribe(diagnosesData => {
      this.loadedData = this.loadedData.concat(diagnosesData);
      this.options = this.options.concat(this.loadedData.map(data => data.name));
    });

    this.labValueService.getLabValueNames().subscribe(labValuesData => {
      this.loadedData = this.loadedData.concat(labValuesData);
      this.options = this.options.concat(this.loadedData.map(data => data.name));
    });

    this.procedureService.getProcedureNames().subscribe(procedureData => {
      this.loadedData = this.loadedData.concat(procedureData);
      this.options = this.options.concat(this.loadedData.map(data => data.name));
    });

    this.vitalSignService.getVitalSignNames().subscribe(vitalSignData => {
      this.loadedData = this.loadedData.concat(vitalSignData);
      this.options = this.options.concat(this.loadedData.map(data => data.name));
    });
  }

  onRowClick(id: number, dataType: Data): void {
    let dataSet: any;
    switch (dataType) {
      case Data.VitalSign:
        this.vitalSignService.getVitalSignById(id).subscribe(vitalSign => {
          dataSet = vitalSign;
          this.openDialog(dataType, dataSet);
        });
        break;
      case Data.Diagnosis:
        this.diagnosisService.getDiagnosisById(id).subscribe(diagnosis => {
          dataSet = diagnosis;
          this.openDialog(dataType, dataSet);
        });
        break;
      case Data.Medication:
        this.medicationService.getMedicationById(id).subscribe(medication => {
          dataSet = medication;
          this.openDialog(dataType, dataSet);
        });
        break;
      case Data.Procedure:
        this.procedureService.getProcedureById(id).subscribe(procedure => {
          dataSet = procedure;
          this.openDialog(dataType, dataSet);
        });
        break;
    }
  }

  openDialog(dataType: Data, dataSet: any) {
    const dialogRef = this.dialog.open(ValueDialogComponent, {
      data: [dataType, dataSet],
    });
  }
}
