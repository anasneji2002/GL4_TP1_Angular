import { Component } from '@angular/core';
import { RainbowWritingDirective } from 'src/app/directives/rainbowWritingDirective/rainbow-writing.directive';

@Component({
  selector: 'app-test-rainbow-writing-directive',
  standalone: true,
  imports: [RainbowWritingDirective],
  templateUrl: './test-rainbow-writing-directive.component.html',
  styleUrl: './test-rainbow-writing-directive.component.css'
})
export class TestRainbowWritingDirectiveComponent {

}
