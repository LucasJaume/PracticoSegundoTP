import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioNoRegistradoComponent } from './inicio-no-registrado.component';

describe('InicioNoRegistradoComponent', () => {
  let component: InicioNoRegistradoComponent;
  let fixture: ComponentFixture<InicioNoRegistradoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioNoRegistradoComponent]
    });
    fixture = TestBed.createComponent(InicioNoRegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
