import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Cv } from "../model/cv";
import { CommonModule } from "@angular/common";
import { ItemComponent } from "../item/item.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  standalone:true,
  imports:[CommonModule,ItemComponent]
})
export class ListComponent {
  @Input() cvs: Cv[] | null = [];
}
