
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-custom-tooltip',
    templateUrl: './custom-tooltip.component.html',
    standalone: true,
    imports: [
        NgIf
    ],
    styleUrls: ['./custom-tooltip.component.css']
})
export class CustomTooltipComponent {
  @Input() text!: string;
  @Input() header!: string;
  @Output() closeTooltip = new EventEmitter<void>();

  onCloseTooltip() {
    this.closeTooltip.emit();
  }

}



