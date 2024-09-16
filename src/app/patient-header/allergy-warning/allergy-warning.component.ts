import {Component, Input} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {PatientEnum} from "../../enums/patient.enum";

@Component({
  selector: 'app-allergy-warning',
  standalone: true,
  imports: [NgOptimizedImage, NgClass, NgIf],
  templateUrl: './allergy-warning.component.html',
  styleUrl: './allergy-warning.component.css',
})
export class AllergyWarningComponent {
  @Input() patientType: PatientEnum | undefined
  protected readonly PatientEnum = PatientEnum;
  public collapsed = true;

  public collapsBanner() {
    this.collapsed = !this.collapsed;
  }
}


