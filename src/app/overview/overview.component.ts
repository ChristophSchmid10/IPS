import { Component, OnInit } from '@angular/core';
import { Data } from '../enums/data.enum';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  tableOrder: { [key: number]: Data } = {};

  protected readonly Data = Data;

  ngOnInit() {
    this.tableOrder[0] = Data.Medication;
    this.tableOrder[1] = Data.Diagnosis;
    this.tableOrder[2] = Data.LabValue;
    this.tableOrder[3] = Data.Procedure;
  }

  changeTableOrder(number: number) {
    const temp = this.tableOrder[number];
    this.tableOrder[number] = this.tableOrder[0];
    this.tableOrder[0] = temp;
  }
}
