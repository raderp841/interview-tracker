import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpostComponent } from './subpost.component';

describe('SubpostComponent', () => {
  let component: SubpostComponent;
  let fixture: ComponentFixture<SubpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
