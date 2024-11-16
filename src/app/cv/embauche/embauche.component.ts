import { Component, computed, inject, signal, WritableSignal, Signal } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';

import { ItemComponent } from '../item/item.component';

@Component({
    selector: 'app-embauche',
    templateUrl: './embauche.component.html',
    styleUrls: ['./embauche.component.css'],
    standalone: true,
    imports: [
    ItemComponent
],
})
export class EmbaucheComponent {
  private embaucheService = inject(EmbaucheService);

  public embauchees: Signal<Cv[]> ;
  constructor() {
    //this.embauchees.set(this.embaucheService.getEmbauchees()());
    this.embauchees = computed(()=>
      {
        return this.embaucheService.embauchees();
      });
  }
}