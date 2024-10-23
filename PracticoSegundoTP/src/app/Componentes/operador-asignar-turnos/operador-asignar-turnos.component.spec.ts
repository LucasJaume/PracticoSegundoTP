import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorAsignarTurnosComponent } from './operador-asignar-turnos.component';

describe('OperadorAsignarTurnosComponent', () => {
  let component: OperadorAsignarTurnosComponent;
  let fixture: ComponentFixture<OperadorAsignarTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperadorAsignarTurnosComponent]
    });
    fixture = TestBed.createComponent(OperadorAsignarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
