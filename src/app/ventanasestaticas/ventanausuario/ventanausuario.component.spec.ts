import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanausuarioComponent } from './ventanausuario.component';

describe('VentanausuarioComponent', () => {
  let component: VentanausuarioComponent;
  let fixture: ComponentFixture<VentanausuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanausuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
