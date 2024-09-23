
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  private overlaySubject = new Subject<boolean>();
  overlayState$ = this.overlaySubject.asObservable();

  toggleOverlay(state: boolean) {
    this.overlaySubject.next(state);
  }
}
