import { Component } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';


@Component({
  selector: 'app-embauche',
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css'],
  standalone:true,
  imports:[CommonModule,ItemComponent],

})
export class EmbaucheComponent {
  public embauchees: Cv[] = [];
  constructor(private embaucheService: EmbaucheService) {
    this.embauchees = this.embaucheService.getEmbauchees();
  }
}
