
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchFieldData } from "../../models/search-field-data.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-global-search-field-overlay',
  templateUrl: `global-search-field-overlay.component.html`,
  styleUrl: 'global-search-field-overlay.component.css',
  standalone: true,
  imports: [
    NgForOf
  ]
})
export class GlobalSearchFieldOverlayComponent {
  @Input() filteredOptions: SearchFieldData[] = [];
  @Output() optionSelected = new EventEmitter<SearchFieldData>();

  selectOption(option: SearchFieldData) {
    this.optionSelected.emit(option);
  }
}
