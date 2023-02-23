import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosSearchComponent } from './turnos-search.component';

describe('TurnosSearchComponent', () => {
  let component: TurnosSearchComponent;
  let fixture: ComponentFixture<TurnosSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
