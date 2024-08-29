import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-allergy-warning',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './allergy-warning.component.html',
  styleUrl: './allergy-warning.component.css'
})
export class AllergyWarningComponent {

}
