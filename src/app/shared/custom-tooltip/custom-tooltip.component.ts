
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  standalone: true,
  styleUrls: ['./custom-tooltip.component.css']
})
export class CustomTooltipComponent {
  @Input() text!: string;
  @Input() header!: string;
}

