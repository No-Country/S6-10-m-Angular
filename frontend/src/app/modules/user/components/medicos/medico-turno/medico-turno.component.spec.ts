import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoTurnoComponent } from './medico-turno.component';

describe('MedicoTurnoComponent', () => {
  let component: MedicoTurnoComponent;
  let fixture: ComponentFixture<MedicoTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
