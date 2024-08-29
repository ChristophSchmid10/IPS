import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PatientHeaderComponent} from "./patient-header/patient-header.component";
import {AllergyWarningComponent} from "./patient-header/allergy-warning/allergy-warning.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {TableComponent} from "./overview/table/table.component";
import {Data} from "./enums/data.enum";
import {OverviewComponent} from "./overview/overview.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientHeaderComponent, AllergyWarningComponent, MatTab, MatTabGroup, TableComponent, OverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IPS';
  protected readonly Data = Data;
}
