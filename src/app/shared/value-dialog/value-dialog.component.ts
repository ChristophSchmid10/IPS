
import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DatePipe} from "@angular/common";
import {Data} from "../../enums/data.enum";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  standalone: true,
  imports: [
    DatePipe,
    MatIconButton
  ],
  styleUrls: ['./value-dialog.component.css']
})
export class ValueDialogComponent implements OnInit{

  public dataSet: any;
  public dataType: Data = Data.LabValue;
  constructor(
    public dialogRef: MatDialogRef<ValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dataType = this.data[0];
    this.dataSet = this.data[1];
  }

  getImage(): string {
    return 'assets/Icons/' + this.dataType.toString() + '.svg';
  }

  protected readonly Data = Data;
}
