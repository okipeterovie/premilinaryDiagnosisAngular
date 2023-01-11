import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremilinaryDiagnosisComponent } from './premilinary-diagnosis.component';

describe('PremilinaryDiagnosisComponent', () => {
  let component: PremilinaryDiagnosisComponent;
  let fixture: ComponentFixture<PremilinaryDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremilinaryDiagnosisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremilinaryDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
