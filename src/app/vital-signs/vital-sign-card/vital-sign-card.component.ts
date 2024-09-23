import {Component, Input, OnInit} from '@angular/core';
import { VitalSign } from '../../models/vital-sign.model';
import { DatePipe, NgIf } from '@angular/common';
import { ValueDialogComponent } from '../../shared/value-dialog/value-dialog.component';
import { Data } from '../../enums/data.enum';
import { MatDialog } from '@angular/material/dialog';
import {HelpComponent} from "../../shared/help/help.component";
import {HelpService} from "../../services/help.service";

@Component({
  selector: 'app-vital-sign-card',
  standalone: true,
    imports: [DatePipe, NgIf, HelpComponent],
  templateUrl: './vital-sign-card.component.html',
  styleUrl: './vital-sign-card.component.css',
})
export class VitalSignCardComponent implements OnInit{
  @Input() vitalSign: VitalSign | undefined;
  @Input() vertical: boolean = false;
  protected readonly Data = Data;
  public showPoint = false;

  constructor(private dialog: MatDialog,
              private helpService: HelpService) {}

  onCardClick(dataSet: any, dataType: Data): void {
    const dialogRef = this.dialog.open(ValueDialogComponent, {
      data: [dataType, dataSet],
      width: '90%'
    });
  }


  ngOnInit() {
    this.helpService.overlayState$.subscribe(state => {
      this.showPoint = state;
    });
  }

  getToolTipText() {
    return 'Diese Karte zeigt einen spezifischen Vitalparameter des Patienten an. Jeder Vitalparameter enthält wichtige Informationen wie den Messwert, die Einheit, das Datum der Messung. Bei mehreren Messungen eines Vitalparameters kann auch die Änderung des Wertes angezeigt werden. Klicken Sie auf eine Karte, um weitere Details und anzuzeigen.';
  }
}
