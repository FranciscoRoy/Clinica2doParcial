import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionturnosProfesionalComponent } from './gestionturnos-profesional.component';

describe('GestionturnosProfesionalComponent', () => {
  let component: GestionturnosProfesionalComponent;
  let fixture: ComponentFixture<GestionturnosProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionturnosProfesionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionturnosProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
