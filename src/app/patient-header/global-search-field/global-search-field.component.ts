import {Component, OnInit} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-global-search-field',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatAutocompleteTrigger, MatAutocomplete, MatOption, AsyncPipe, ReactiveFormsModule, NgForOf],

  templateUrl: './global-search-field.component.html',
  styleUrl: './global-search-field.component.css'
})
export class GlobalSearchFieldComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
