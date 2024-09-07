import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveMedicalCheckupComponent } from './preventive-medical-checkup.component';

describe('PreventiveMedicalCheckupComponent', () => {
  let component: PreventiveMedicalCheckupComponent;
  let fixture: ComponentFixture<PreventiveMedicalCheckupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreventiveMedicalCheckupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreventiveMedicalCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
