import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ttc-calculator',
  templateUrl: './ttc-calculator.component.html',
  styleUrls: ['./ttc-calculator.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class TtcCalculatorComponent {
  quantity = signal(1);
  price = signal(0);
  tva = signal(18);
  discount = computed(() => {
    const qty = this.quantity();
    if (qty > 15) {
      return 0.3;
    } else if (qty >= 10) {
      return 0.2;
    }
    return 0;
  });
  ttcPrice = computed(() => {
    const basePrice = this.price() * this.quantity();
    const discountedPrice = basePrice * (1 - this.discount());
    return discountedPrice * (1 + this.tva() / 100);
  });
}