import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fibonacci',
  pure: true // Ensures recalculation only happens when input changes
})
export class FibonacciPipe implements PipeTransform {
  transform(n: number): number {
    if (n === 0 || n === 1) {
      return 1;
    }
    return this.transform(n - 1) + this.transform(n - 2);
  }
}
