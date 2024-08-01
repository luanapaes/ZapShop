import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductTableComponent } from "./product-table/product-table.component";

@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [HeaderComponent, ProductTableComponent],
  templateUrl: './adm.component.html',
  styleUrl: './adm.component.scss'
})
export class AdmComponent {

}
