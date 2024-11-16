import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: 'input[appRainbowWriting]',
  standalone: true
})
export class RainbowWritingDirective {
  private colors: string[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
  ];

  @HostBinding('style.color') textColor!: string;
  @HostBinding('style.borderColor') borderColor!: string;

  constructor(private el: ElementRef) {
    this.initRainbowEffect();
  }

  private initRainbowEffect(): void {
    const keyup$ = fromEvent(this.el.nativeElement, 'keyup');

    keyup$
      .pipe(
        map(() => this.getRandomColor())
      )
      .subscribe((color) => {
        this.textColor = color;
        this.borderColor = color;
      });
  }

  private getRandomColor(): string {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }
}
