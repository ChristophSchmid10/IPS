import { Component, OnInit } from '@angular/core';
import { VitalSignService } from '../services/vital-sign.service';
import { VitalSign } from '../models/vital-sign.model';
import { VitalSignCardComponent } from './vital-sign-card/vital-sign-card.component';

@Component({
  selector: 'app-vital-signs',
  standalone: true,
  imports: [VitalSignCardComponent],
  templateUrl: './vital-signs.component.html',
  styleUrl: './vital-signs.component.css',
})
export class VitalSignsComponent implements OnInit {
  vitalSigns: VitalSign[] = [];
  constructor(private vitalSignService: VitalSignService) {}

  ngOnInit() {
    this.vitalSignService.getVitalSigns().subscribe((data: VitalSign[]) => {
      this.vitalSigns = data;
    });
  }

  getVitalSign(name: string) {
    const filteredVitalSign = this.vitalSigns.find(
      (vitalSign) => vitalSign.name === name,
    );
    return filteredVitalSign ? filteredVitalSign : undefined;
  }
}
