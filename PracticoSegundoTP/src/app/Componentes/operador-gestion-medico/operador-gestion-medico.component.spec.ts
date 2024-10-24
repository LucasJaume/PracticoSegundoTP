import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorGestionMedicoComponent } from './operador-gestion-medico.component';

describe('OperadorGestionMedicoComponent', () => {
  let component: OperadorGestionMedicoComponent;
  let fixture: ComponentFixture<OperadorGestionMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperadorGestionMedicoComponent]
    });
    fixture = TestBed.createComponent(OperadorGestionMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
