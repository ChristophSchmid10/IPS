import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignCardComponent } from './vital-sign-card.component';

describe('VitalSignCardComponent', () => {
  let component: VitalSignCardComponent;
  let fixture: ComponentFixture<VitalSignCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalSignCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VitalSignCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
