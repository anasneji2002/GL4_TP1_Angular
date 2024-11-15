import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRainbowWritingDirectiveComponent } from './test-rainbow-writing-directive.component';

describe('TestRainbowWritingDirectiveComponent', () => {
  let component: TestRainbowWritingDirectiveComponent;
  let fixture: ComponentFixture<TestRainbowWritingDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRainbowWritingDirectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRainbowWritingDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
