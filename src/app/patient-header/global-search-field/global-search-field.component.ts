
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MedicationService } from "../../services/medication.service";
import { DiagnosisService } from "../../services/diagnosis.service";
import { LabValueService } from "../../services/lab-value.service";
import { ProcedureService } from "../../services/procedure.service";
import { VitalSignService } from "../../services/vital-sign.service";
import { SearchFieldData } from "../../models/search-field-data.model";
import { ValueDialogComponent } from "../../shared/value-dialog/value-dialog.component";
import { Data } from "../../enums/data.enum";
import { MatDialog } from "@angular/material/dialog";
import { PatientEnum } from "../../enums/patient.enum";
import { Router } from "@angular/router";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {GlobalSearchFieldOverlayComponent} from "../global-search-field-overlay/global-search-field-overlay.component";

@Component({
  selector: 'app-global-search-field',
  templateUrl: './global-search-field.component.html',
  styleUrls: ['./global-search-field.component.css'],
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class GlobalSearchFieldComponent implements OnInit, AfterViewInit {
  searchControl = new FormControl('');
  filteredOptions: SearchFieldData[] = [];
  loadedData: SearchFieldData[] = [];
  patientType: PatientEnum = PatientEnum.MedicalCheckup;
  overlayRef!: OverlayRef;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private medicationService: MedicationService,
    private diagnosisService: DiagnosisService,
    private labValueService: LabValueService,
    private procedureService: ProcedureService,
    private vitalSignService: VitalSignService,
    private dialog: MatDialog,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.patientType = this.router.url === '/preventive-medical-checkup' ? PatientEnum.MedicalCheckup : PatientEnum.NoProblems;
    this.loadData();
    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.filteredOptions = this._filter(value || "");
      if (this.filteredOptions.length > 0) {
        this.openOverlay();
      } else if (this.overlayRef) {
        this.overlayRef.detach();
      }
    });
  }

  ngAfterViewInit() {}

  private _filter(value: string): SearchFieldData[] {
    const filterValue = value.toLowerCase();
    return this.loadedData.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectOption(option: SearchFieldData) {
    this.searchControl.setValue(option.name);
    this.filteredOptions = [];
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.onRowClick(option.id, option.dataType);
  }

  loadData() {
    this.medicationService.getMedicationNames(this.patientType).subscribe(medicationData => {
      this.loadedData = this.loadedData.concat(medicationData);
    });
    this.diagnosisService.getDiagnosesNames(this.patientType).subscribe(diagnosesData => {
      this.loadedData = this.loadedData.concat(diagnosesData);
    });
    this.labValueService.getLabValueNames(this.patientType).subscribe(labValuesData => {
      this.loadedData = this.loadedData.concat(labValuesData);
    });
    this.procedureService.getProcedureNames(this.patientType).subscribe(procedureData => {
      this.loadedData = this.loadedData.concat(procedureData);
    });
    this.vitalSignService.getVitalSignNames(this.patientType).subscribe(vitalSignData => {
      this.loadedData = this.loadedData.concat(vitalSignData);
    });
  }

  onRowClick(id: number, dataType: Data): void {
    let dataSet: any;
    switch (dataType) {
      case Data.VitalSign:
        this.vitalSignService.getVitalSignById(this.patientType, id).subscribe(vitalSign => {
          dataSet = vitalSign;
          this.openDialog(dataType, dataSet);
        });
        break;
      case Data.Diagnosis:
        this.diagnosisService.getDiagnosisById(this.patientType, id).subscribe(diagnosis => {
          dataSet = diagnosis;
          this.openDialog(dataType, dataSet);
        });
        break;
      case Data.Medication:
        this.medicationService.getMedicationById(this.patientType, id).subscribe(medication => {
          dataSet = medication;
          this.openDialog(dataType, dataSet);
        });
        break;
      case Data.Procedure:
        this.procedureService.getProcedureById(this.patientType, id).subscribe(procedure => {
          dataSet = procedure;
          this.openDialog(dataType, dataSet);
        });
        break;
      case Data.LabValue:
        this.labValueService.getLabValueById(this.patientType, id).subscribe(labValue => {
          dataSet = labValue;
          this.openDialog(dataType, dataSet);
        });
        break;
    }
  }

  openDialog(dataType: Data, dataSet: any) {
    this.dialog.open(ValueDialogComponent, {
      data: [dataType, dataSet],
    });
  }

  openOverlay() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.searchInput)
      .withPositions([{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }])
      .withDefaultOffsetY(10);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    const portal = new ComponentPortal(GlobalSearchFieldOverlayComponent, this.viewContainerRef);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.filteredOptions = this.filteredOptions;
    componentRef.instance.optionSelected.subscribe((option: SearchFieldData) => {
      this.selectOption(option);
      this.overlayRef.detach();
    });

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }
}
