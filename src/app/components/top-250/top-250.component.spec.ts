import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top250Component } from './top-250.component';

describe('Top250Component', () => {
  let component: Top250Component;
  let fixture: ComponentFixture<Top250Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top250Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top250Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
