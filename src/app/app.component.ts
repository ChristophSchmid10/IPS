import {Component, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { AllergyWarningComponent } from './patient-header/allergy-warning/allergy-warning.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { TableComponent } from './overview/table/table.component';
import { Data } from './enums/data.enum';
import { OverviewComponent } from './overview/overview.component';
import { VitalSignsComponent } from './vital-signs/vital-signs.component';
import {PreventiveMedicalCheckupComponent} from "./preventive-medical-checkup/preventive-medical-checkup.component";
import {NgClass, NgIf} from "@angular/common";
import {HelpService} from "./services/help.service";
import {MatFabButton} from "@angular/material/button";

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
    NgClass,
    MatFabButton,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'QuickHealth';
  protected readonly Data = Data;
  showHeaderAndNav = true;

constructor(public router: Router,
            private helpService: HelpService) {}
  showOverlay = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault(); // Prevent the default behavior of F1 key
      this.handleHelp();
    }
  }

  handleHelp() {
    this.showOverlay = !this.showOverlay;
    this.helpService.toggleOverlay(this.showOverlay);
  }
}
