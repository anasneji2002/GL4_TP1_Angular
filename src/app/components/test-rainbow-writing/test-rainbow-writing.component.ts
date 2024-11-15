import { Component } from '@angular/core';
import { RainbowWritingDirective } from 'src/app/directives/rainbowWriting/rainbow-writing.directive';

@Component({
  selector: 'app-test-rainbow-writing',
  standalone: true,
  imports: [RainbowWritingDirective],
  templateUrl: './test-rainbow-writing.component.html',
  styleUrl: './test-rainbow-writing.component.css'
})
export class TestRainbowWritingComponent {

}
