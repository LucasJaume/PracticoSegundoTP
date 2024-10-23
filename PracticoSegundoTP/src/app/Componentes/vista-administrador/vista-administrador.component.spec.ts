import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdministradorComponent } from './vista-administrador.component';

describe('VistaAdministradorComponent', () => {
  let component: VistaAdministradorComponent;
  let fixture: ComponentFixture<VistaAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaAdministradorComponent]
    });
    fixture = TestBed.createComponent(VistaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
