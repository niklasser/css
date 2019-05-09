import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRecordPage } from './tab-record.page';

describe('TabRecordPage', () => {
  let component: TabRecordPage;
  let fixture: ComponentFixture<TabRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabRecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
