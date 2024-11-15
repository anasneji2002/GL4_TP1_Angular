import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  WritableSignal,
} from '@angular/core';
import { signal, effect } from '@angular/core';

@Directive({
  selector: '[appRainbowWriting]',
  standalone: true
})
export class RainbowWritingDirective {

  private readonly colors: string[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
  ];

  private color: WritableSignal<string> = signal(this.getRandomColor());

  @HostBinding('style.color') textColor!: string;
  @HostBinding('style.borderColor') borderColor!: string;

  constructor(private el: ElementRef) {
    this.initRainbowEffect();
  }

  private initRainbowEffect(): void {
    if (!(this.el.nativeElement instanceof HTMLInputElement)) {
      console.error(`cette directive ne peut pas etre appliquée à ${this.el.nativeElement}.`);
      return;
    }

    effect(() => {
      const currentColor = this.color();
      this.textColor = currentColor;
      this.borderColor = currentColor;
    });
  }

  @HostListener('keyup') onKeyUp(): void {
    this.color.set(this.getRandomColor());
  }

  private getRandomColor(): string {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }
}
