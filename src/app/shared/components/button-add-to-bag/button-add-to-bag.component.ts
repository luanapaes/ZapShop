import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-add-to-bag',
  standalone: true,
  imports: [],
  templateUrl: './button-add-to-bag.component.html',
  styleUrl: './button-add-to-bag.component.scss'
})
export class ButtonAddToBagComponent {
  @Input() productId: string = '';

  verId(){
    console.log(this.productId)
  }

}
