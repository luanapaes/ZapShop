import { Component } from '@angular/core';
import { ButtonBrandComponent } from '../../shared/components/button-brand/button-brand.component';
import { CardMarcaComponent } from '../../shared/components/card-marca/card-marca.component';
import { CardProdutoComponent } from '../../shared/components/card-produto/card-produto.component';
import { FaixaAnimadaComponent } from '../../shared/components/faixa-animada/faixa-animada.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,
    FaixaAnimadaComponent, ButtonBrandComponent,
    CardMarcaComponent, FooterComponent,
    CardProdutoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isHome: boolean = false;
}
