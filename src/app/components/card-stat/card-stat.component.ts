import { Component, Input } from '@angular/core';
import { IJoueur } from 'src/app/core/interfaces/IJoueur';

@Component({
  selector: 'app-card-stat',
  templateUrl: './card-stat.component.html',
  styleUrls: ['./card-stat.component.css']
})
export class CardStatComponent {
  @Input() titre! : string
  @Input() data! : string
}
