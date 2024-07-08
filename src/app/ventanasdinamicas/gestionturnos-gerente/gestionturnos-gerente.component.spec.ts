import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionturnosGerenteComponent } from './gestionturnos-gerente.component';

describe('GestionturnosGerenteComponent', () => {
  let component: GestionturnosGerenteComponent;
  let fixture: ComponentFixture<GestionturnosGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionturnosGerenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionturnosGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
