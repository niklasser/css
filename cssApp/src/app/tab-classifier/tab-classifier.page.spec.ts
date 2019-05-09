import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabClassifierPage } from './tab-classifier.page';

describe('TabClassifierPage', () => {
  let component: TabClassifierPage;
  let fixture: ComponentFixture<TabClassifierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabClassifierPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabClassifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
