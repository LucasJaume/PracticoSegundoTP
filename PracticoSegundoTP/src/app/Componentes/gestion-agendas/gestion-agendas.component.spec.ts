import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAgendasComponent } from './gestion-agendas.component';

describe('GestionAgendasComponent', () => {
  let component: GestionAgendasComponent;
  let fixture: ComponentFixture<GestionAgendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAgendasComponent]
    });
    fixture = TestBed.createComponent(GestionAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
