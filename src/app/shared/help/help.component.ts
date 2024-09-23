
import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  standalone: true,
  imports: [
    NgClass
  ],
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit, OnDestroy {
  @Input() toolTipText!: string;
  @Input() toolTipHeader!: string;
  @Input() toolTipClass!: string;

  @ViewChild('tooltipTrigger', { static: true }) tooltipTrigger!: ElementRef;

  private overlayRef!: OverlayRef;
  showTooltip = false;
  private mobileDevices = [
    'Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'
  ];

  constructor(private overlay: Overlay) {}

  ngOnInit() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.tooltipTrigger)
      .withPositions([{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
      }]);
    const scrollStrategy = this.overlay.scrollStrategies.block();

    this.overlayRef = this.overlay.create({ positionStrategy, scrollStrategy, hasBackdrop: true });
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  show() {
    if (!this.overlayRef.hasAttached()) {
      const tooltipPortal = new ComponentPortal(CustomTooltipComponent);
      const tooltipComponentRef = this.overlayRef.attach(tooltipPortal);
      tooltipComponentRef.instance.header = this.toolTipHeader;
      tooltipComponentRef.instance.text = this.toolTipText;
    }
    this.showTooltip = true;
  }

  hide() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    this.showTooltip = false;
  }

  checkMobile() {
    if (this.mobileDevices.some(device => navigator.userAgent.includes(device))) {
      console.log('Here');
     this.showTooltip ? this.hide() : this.show();
    }
  }
}
