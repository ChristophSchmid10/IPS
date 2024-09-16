import { Component, Input } from '@angular/core';
import { VitalSign } from '../../models/vital-sign.model';
import { DatePipe, NgIf } from '@angular/common';
import { ValueDialogComponent } from '../../shared/value-dialog/value-dialog.component';
import { Data } from '../../enums/data.enum';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vital-sign-card',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './vital-sign-card.component.html',
  styleUrl: './vital-sign-card.component.css',
})
export class VitalSignCardComponent {
  @Input() vitalSign: VitalSign | undefined;
  @Input() vertical: boolean = false;

  constructor(private dialog: MatDialog) {}

  onCardClick(dataSet: any, dataType: Data): void {
    const dialogRef = this.dialog.open(ValueDialogComponent, {
      data: [dataType, dataSet],
      width: '90%'
    });
  }

  protected readonly Data = Data;
}
