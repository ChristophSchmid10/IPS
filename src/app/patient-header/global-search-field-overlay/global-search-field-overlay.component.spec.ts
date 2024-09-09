import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchFieldOverlayComponent } from './global-search-field-overlay.component';

describe('GlobalSearchFieldOverlayComponent', () => {
  let component: GlobalSearchFieldOverlayComponent;
  let fixture: ComponentFixture<GlobalSearchFieldOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSearchFieldOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalSearchFieldOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
