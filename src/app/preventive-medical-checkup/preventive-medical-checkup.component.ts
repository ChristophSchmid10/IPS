
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { OverviewComponent } from "../overview/overview.component";
import { PatientHeaderComponent } from "../patient-header/patient-header.component";
import { VitalSignsComponent } from "../vital-signs/vital-signs.component";
import { GlobalSearchFieldComponent } from "../patient-header/global-search-field/global-search-field.component";
import { NgIf } from "@angular/common";
import { HelpService } from "../services/help.service";
import { HelpComponent } from "../shared/help/help.component";

@Component({
  selector: 'app-preventive-medical-checkup',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    OverviewComponent,
    PatientHeaderComponent,
    VitalSignsComponent,
    GlobalSearchFieldComponent,
    NgIf,
    HelpComponent
  ],
  templateUrl: './preventive-medical-checkup.component.html',
  styleUrl: './preventive-medical-checkup.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PreventiveMedicalCheckupComponent implements OnInit {

  constructor(private helpService: HelpService) { }

  showOverlay = false;
  showPoint = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault();
      this.showOverlay = !this.showOverlay;
      this.helpService.toggleOverlay(this.showOverlay);
    }
  }

  ngOnInit() {
    this.helpService.overlayState$.subscribe(state => {
      this.showPoint = state;
    });
  }

  getToolTipText(tab: string): string {
    return tab === 'overview'
      ? 'In diesem Tab werden die wichtigsten Informationen des Patienten in tabellarischer Form angezeigt. Dazu gehören: Medikation: Eine Liste aller aktuellen Medikamente des Patienten, einschließlich Dosierung und Einnahmezeitraum. Diagnosen: Eine Aufstellung der aktuellen Diagnosen des Patienten. Laborparameter: Ergebnisse von Laboruntersuchungen des Patienten. Prozeduren: Durchgeführte Eingriffe und medizinische Prozeduren. Um eine Tabelle zu maximieren, klicken Sie auf das Maximieren-Symbol in der rechten oberen Ecke einer minimierten Tabelle. Die Tabellen können nach den Spaltenüberschriften durch einen Klick darauf sortiert werden.'
      : 'In diesem Tab werden die verschiedenen Vitalparameter des Patienten angezeigt. Dazu gehören Messwerte wie Größe, Gewicht, Blutdruck, Herzfrequenz und andere wichtige Indikatoren, die den aktuellen Gesundheitszustand des Patienten widerspiegeln.';
  }
}
