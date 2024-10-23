import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaMedicoComponent } from './vista-medico.component';

describe('VistaMedicoComponent', () => {
  let component: VistaMedicoComponent;
  let fixture: ComponentFixture<VistaMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaMedicoComponent]
    });
    fixture = TestBed.createComponent(VistaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
