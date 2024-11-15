import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRainbowWritingComponent } from './test-rainbow-writing.component';

describe('TestRainbowWritingComponent', () => {
  let component: TestRainbowWritingComponent;
  let fixture: ComponentFixture<TestRainbowWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRainbowWritingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRainbowWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
