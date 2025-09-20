import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresaComponent } from './ingresa.component';

describe('IngresaComponent', () => {
  let component: IngresaComponent;
  let fixture: ComponentFixture<IngresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
