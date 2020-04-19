import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFieldGroupComponent } from './validation-field-group.component';

describe('ValidationFieldGroupComponent', () => {
  let component: ValidationFieldGroupComponent;
  let fixture: ComponentFixture<ValidationFieldGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationFieldGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationFieldGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
