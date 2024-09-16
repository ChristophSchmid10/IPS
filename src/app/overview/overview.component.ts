
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Data } from '../enums/data.enum';
import { TableComponent } from './table/table.component';
import {NgIf} from "@angular/common";
import {BreakpointService} from "../services/breakpoint.service";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [TableComponent, NgIf],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  tableOrder: { [key: number]: Data } = {};
  layout: string = 'xl';

  protected readonly Data = Data;

  constructor(private breakPointService: BreakpointService) {}

  ngOnInit() {
    this.tableOrder[0] = Data.Medication;
    this.tableOrder[1] = Data.Diagnosis;
    this.tableOrder[2] = Data.LabValue;
    this.tableOrder[3] = Data.Procedure;

    this.breakPointService.layout$.subscribe(layout => {
      this.layout = layout;
    });
  }

  changeTableOrder(number: number) {
    const temp = this.tableOrder[number];
    this.tableOrder[number] = this.tableOrder[0];
    this.tableOrder[0] = temp;
  }
}
