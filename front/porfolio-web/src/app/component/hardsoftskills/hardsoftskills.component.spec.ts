import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardsoftskillsComponent } from './hardsoftskills.component';

describe('HardsoftskillsComponent', () => {
  let component: HardsoftskillsComponent;
  let fixture: ComponentFixture<HardsoftskillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardsoftskillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardsoftskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
