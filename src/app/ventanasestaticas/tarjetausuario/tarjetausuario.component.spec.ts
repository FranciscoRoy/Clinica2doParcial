import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetausuarioComponent } from './tarjetausuario.component';

describe('TarjetausuarioComponent', () => {
  let component: TarjetausuarioComponent;
  let fixture: ComponentFixture<TarjetausuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetausuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
