import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchFieldComponent } from './global-search-field.component';

describe('GlobalSearchFieldComponent', () => {
  let component: GlobalSearchFieldComponent;
  let fixture: ComponentFixture<GlobalSearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSearchFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
