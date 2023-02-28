import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosListComponent } from './turnos-list.component';

describe('TurnosListComponent', () => {
  let component: TurnosListComponent;
  let fixture: ComponentFixture<TurnosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
