import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorCrearPacienteComponent } from './operador-crear-paciente.component';

describe('OperadorCrearPacienteComponent', () => {
  let component: OperadorCrearPacienteComponent;
  let fixture: ComponentFixture<OperadorCrearPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperadorCrearPacienteComponent]
    });
    fixture = TestBed.createComponent(OperadorCrearPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
