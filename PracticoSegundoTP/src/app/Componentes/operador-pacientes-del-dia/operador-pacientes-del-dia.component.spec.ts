import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorPacientesDelDiaComponent } from './operador-pacientes-del-dia.component';

describe('OperadorPacientesDelDiaComponent', () => {
  let component: OperadorPacientesDelDiaComponent;
  let fixture: ComponentFixture<OperadorPacientesDelDiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperadorPacientesDelDiaComponent]
    });
    fixture = TestBed.createComponent(OperadorPacientesDelDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
