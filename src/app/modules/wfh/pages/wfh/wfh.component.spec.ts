/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WfhComponent } from './wfh.component';

describe('WfhComponent', () => {
  let component: WfhComponent;
  let fixture: ComponentFixture<WfhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
