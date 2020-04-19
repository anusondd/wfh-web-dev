/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CounterStateComponent } from './counter-state.component';

describe('CounterStateComponent', () => {
  let component: CounterStateComponent;
  let fixture: ComponentFixture<CounterStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
