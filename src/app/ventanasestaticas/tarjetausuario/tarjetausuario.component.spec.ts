import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaUsuarioComponent } from './tarjetausuario.component';

describe('TarjetausuarioComponent', () => {
  let component: TarjetaUsuarioComponent;
  let fixture: ComponentFixture<TarjetaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
