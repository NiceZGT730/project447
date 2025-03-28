import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxOfficeComponent } from './box-office.component';

describe('BoxOfficeComponent', () => {
  let component: BoxOfficeComponent;
  let fixture: ComponentFixture<BoxOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
