import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoastRecorderComponent } from './roast-recorder.component';

describe('RoastRecorderComponent', () => {
  let component: RoastRecorderComponent;
  let fixture: ComponentFixture<RoastRecorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoastRecorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoastRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
