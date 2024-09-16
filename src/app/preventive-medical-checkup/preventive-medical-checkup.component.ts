import {Component, ViewEncapsulation} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {OverviewComponent} from "../overview/overview.component";
import {PatientHeaderComponent} from "../patient-header/patient-header.component";
import {VitalSignsComponent} from "../vital-signs/vital-signs.component";
import {GlobalSearchFieldComponent} from "../patient-header/global-search-field/global-search-field.component";

@Component({
  selector: 'app-preventive-medical-checkup',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    OverviewComponent,
    PatientHeaderComponent,
    VitalSignsComponent,
    GlobalSearchFieldComponent
  ],
  templateUrl: './preventive-medical-checkup.component.html',
  styleUrl: './preventive-medical-checkup.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PreventiveMedicalCheckupComponent {

}
