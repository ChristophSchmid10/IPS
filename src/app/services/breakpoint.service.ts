
import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  layout$: Observable<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.layout$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(
      map((result: BreakpointState) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          return 'xs';
        } else if (result.breakpoints[Breakpoints.Small]) {
          return 'sm';
        } else if (result.breakpoints[Breakpoints.Medium]) {
          return 'md';
        } else if (result.breakpoints[Breakpoints.Large]) {
          return 'lg';
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          return 'xl';
        } else {
          return 'xl'; // Default layout
        }
      })
    );
  }
}
