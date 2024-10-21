import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaespecialistasComponent } from './listaespecialistas.component';

describe('ListaespecialistasComponent', () => {
  let component: ListaespecialistasComponent;
  let fixture: ComponentFixture<ListaespecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaespecialistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaespecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
