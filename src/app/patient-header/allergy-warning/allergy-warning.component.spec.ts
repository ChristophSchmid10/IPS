import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyWarningComponent } from './allergy-warning.component';

describe('AllergyWarningComponent', () => {
  let component: AllergyWarningComponent;
  let fixture: ComponentFixture<AllergyWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllergyWarningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllergyWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
